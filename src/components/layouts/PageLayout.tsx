import type { PropsWithChildren } from "react";

export const PageLayout = ({ children }: PropsWithChildren) => (
    <div className="min-h-screen w-full bg-red-300 font-sans pt-32">
        {children}
    </div>
)