import type { PropsWithChildren } from "react";

export const Card = ({children} : PropsWithChildren) => (
    <div className="bg-white/90 rounded-xl border border-pink-300 shadow p-4 grid gap-4">
        {children}
    </div>
)