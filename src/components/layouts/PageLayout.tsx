import type { PropsWithChildren } from "react";

export const PageLayout = ({ children }: PropsWithChildren) => (
    <div className="min-h-screen w-full bg-red-300">
        {children}
    </div>
)