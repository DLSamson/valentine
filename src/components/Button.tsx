import type { PropsWithChildren } from "react";

export const Button = ({ onClick, children }: PropsWithChildren<{onClick?: () => void}>) => (
    <button onClick={onClick} className="border border-pink-200 bg-red-500 px-4 py-2 hover:bg-red-400 text-white rounded-xl">
        {children}
    </button>
)