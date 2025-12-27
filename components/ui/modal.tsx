"use client";

import { ReactNode, useEffect } from "react";

export type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
};

export function Modal({ open, onClose, children, className }: ModalProps) {
    useEffect(() => {
        if (!open) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed top-0 right-0 z-[10000] flex flex-col items-end w-full sm:w-auto p-0 sm:p-0 pointer-events-none">
            <div
                className="relative rounded-lg shadow-lg flex flex-col w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl p-0 sm:p-0 mt-0 sm:mt-0 pointer-events-auto"
                onClick={e => e.stopPropagation()}
            >
                <button
                    aria-label="Close"
                    onClick={e => { e.stopPropagation(); onClose(); }}
                    className="absolute right-0 top-0 z-[1001] flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-base font-medium text-emerald-900 shadow-sm hover:bg-slate-50"
                    style={{ fontFamily: 'Optima', fontWeight: 400 }}
                >
                    <span className="inline">CANCEL</span>
                    <span className="text-xl">×</span>
                </button>
                <div className={className || ""} style={{ paddingTop: 50 }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
