import type { PropsWithChildren } from "react";

export const Container = (props: PropsWithChildren) => (
    <div className="mx-auto max-w-5xl w-full">
        {props.children}
    </div>
)