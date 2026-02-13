import type { PropsWithChildren } from "react";

export const Container = (props: PropsWithChildren) => (
    <div className="mx-auto max-w-5xl w-full p-2 grid items-center gap-4">
        {props.children}
    </div>
)