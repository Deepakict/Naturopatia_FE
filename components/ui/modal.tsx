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
        <div className="modal-responsive absolute right-0 top-0 m-5 flex flex-col items-end z-[10000]">
            <button
                aria-label="Close"
                onClick={e => { e.stopPropagation(); onClose(); }}
                className="relative z-[1001] flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-base font-medium text-emerald-900 shadow-sm hover:bg-slate-50"
                style={{ fontFamily: 'Optima', fontWeight: 400 }}
            >
                <span>CANCEL</span>
                <span className="text-xl">×</span>
            </button>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: 20,
                    boxSizing: 'border-box',
                    width: '100%',
                    maxWidth: 503,
                }}
                className={className || ""}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>

        </div>
    );
}
