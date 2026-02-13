import type { PropsWithChildren } from "react";

export const H1 = ({ children }: PropsWithChildren) => (
    <h1 className="text-black text-xl text-center">
        {children}
    </h1>
)