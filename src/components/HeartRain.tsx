import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Range = { min: number; max: number };

type Particle = {
    id: string;

    emoji: string;

    leftPct: number;      // 0..100
    depth: number;        // 0..1 (глубина)

    sizePx: number;       // итоговый размер
    baseOpacity: number;  // 0..1

    durationS: number;
    delayS: number;

    windPx: number;
    rotateDeg: number;

    blurPx: number;
};

export type HeartRainProps = {
    /** Просто массив “сердец”, можно хоть ["💖","💘",...] */
    emojis: string[];

    /** Плотность потока */
    rateMs?: number;
    maxOnScreen?: number;
    initialCount?: number;

    /** Диапазоны, чтобы выглядело живо */
    sizePx?: Range;
    durationS?: Range;
    windPx?: Range;
    rotateDeg?: Range;
    opacity?: Range;
    blurPx?: Range;

    /** Визуальные мелочи */
    className?: string;  // на слой-оверлей
    zIndex?: number;

    /** Управление */
    disabled?: boolean;
    respectReducedMotion?: boolean;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]!;
const uid = () =>
    (globalThis.crypto?.randomUUID?.() ?? `p_${Date.now()}_${Math.random()}`).toString();

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

function makeParticle(cfg: Required<
    Pick<
        HeartRainProps,
        "emojis" | "sizePx" | "durationS" | "windPx" | "rotateDeg" | "opacity" | "blurPx"
    >
>): Particle {
    const depth = clamp01(Math.random()); // 0 (далеко) .. 1 (ближе)
    const leftPct = rand(2, 98);

    // глубина влияет на всё: ближе = больше, чуть быстрее, меньше blur, сильнее ветер
    const sizePx = lerp(cfg.sizePx.min, cfg.sizePx.max, depth);
    const baseOpacity = lerp(cfg.opacity.min, cfg.opacity.max, depth);

    const durationS =
        lerp(cfg.durationS.max, cfg.durationS.min, depth) + rand(-0.6, 0.6); // ближе = быстрее

    const windBase = lerp(cfg.windPx.min, cfg.windPx.max, depth);
    const windPx = windBase * rand(0.65, 1.15) * (Math.random() < 0.5 ? -1 : 1);

    const rotateDeg =
        lerp(cfg.rotateDeg.min, cfg.rotateDeg.max, depth) * (Math.random() < 0.5 ? -1 : 1);

    const blurPx = lerp(cfg.blurPx.max, cfg.blurPx.min, depth);

    return {
        id: uid(),
        emoji: pick(cfg.emojis),

        leftPct,
        depth,

        sizePx,
        baseOpacity: clamp01(baseOpacity),

        durationS: Math.max(3.8, durationS),
        delayS: rand(0, 1.8),

        windPx,
        rotateDeg,
        blurPx: Math.max(0, blurPx),
    };
}

export function HeartRain({
    emojis,

    rateMs = 180,
    maxOnScreen = 60,
    initialCount = 16,

    sizePx = { min: 14, max: 48 },
    durationS = { min: 6.5, max: 16 },
    windPx = { min: 20, max: 110 },
    rotateDeg = { min: 80, max: 260 },
    opacity = { min: 0.45, max: 1 },
    blurPx = { min: 0, max: 0.6 },

    className,
    zIndex = 50,

    disabled = false,
    respectReducedMotion = true,
}: HeartRainProps) {
    const reduceMotion = useReducedMotion();
    const off = disabled || emojis.length === 0 || (respectReducedMotion && reduceMotion);

    const cfg = useMemo(
        () => ({ emojis, sizePx, durationS, windPx, rotateDeg, opacity, blurPx }),
        [emojis, sizePx, durationS, windPx, rotateDeg, opacity, blurPx]
    );

    const [items, setItems] = useState<Particle[]>(() =>
        off
            ? []
            : Array.from({ length: Math.min(initialCount, maxOnScreen) }, () => makeParticle(cfg))
    );

    useEffect(() => {
        if (off) {
            setItems([]);
            return;
        }

        const t = window.setInterval(() => {
            setItems((prev) => {
                const next = [...prev, makeParticle(cfg)];
                return next.length > maxOnScreen ? next.slice(next.length - maxOnScreen) : next;
            });
        }, rateMs);

        return () => window.clearInterval(t);
    }, [off, rateMs, maxOnScreen, cfg]);

    if (off) return null;

    return (
        <AnimatePresence>
            <div
                aria-hidden
                className={[
                    "fixed inset-0 overflow-hidden pointer-events-none",
                    className ?? "",
                ].join(" ")}
                style={{ zIndex }}
            >
                {items.map((p) => (
                    <motion.div
                        key={p.id}
                        className={[
                            "absolute top-0 select-none will-change-transform",
                            "drop-shadow-[0_10px_18px_rgba(0,0,0,0.12)]",
                        ].join(" ")}
                        style={{
                            left: `${p.leftPct}%`,
                            fontSize: `${p.sizePx}px`,
                        }}
                        initial={{
                            y: "-14vh",
                            x: 0,
                            rotate: 0,
                            opacity: 0,
                            filter: `blur(${p.blurPx}px)`,
                        }}
                        exit={{opacity: 0}}
                        animate={{
                            // “ускорение” без физики: делаем ключевые точки, сначала быстрее разгон, дальше ровно
                            y: ["-14vh", "30vh", "112vh"],
                            x: [0, p.windPx * 0.35, p.windPx],
                            rotate: [0, p.rotateDeg * 0.55, p.rotateDeg],
                            opacity: [0, p.baseOpacity, p.baseOpacity, 0],
                            filter: [
                                `blur(${p.blurPx}px)`,
                                `blur(${Math.max(0, p.blurPx - 0.15)}px)`,
                                `blur(${p.blurPx}px)`,
                            ],
                        }}
                        transition={{
                            duration: p.durationS,
                            delay: p.delayS,
                            times: [0, 0.18, 1], // для y/x/rotate (для opacity будет нормально, framer раскидает)
                            ease: ["easeOut", "linear"], // сегменты между keyframes
                        }}
                        onAnimationComplete={() => {
                            setItems((prev) => prev.filter((x) => x.id !== p.id));
                        }}
                    >
                        {p.emoji}
                    </motion.div>
                ))}
            </div>
        </AnimatePresence>
    );
}
