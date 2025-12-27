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
            <style jsx global>{`
                @media (max-width: 600px) {
                    .modal-responsive {
                        position: fixed !important;
                        left: 0 !important;
                        right: 0 !important;
                        top: 0 !important;
                        bottom: 0 !important;
                        margin: 0 !important;
                        width: 100vw !important;
                        min-width: 0 !important;
                        max-width: 100vw !important;
                        align-items: center !important;
                        justify-content: flex-start !important;
                        z-index: 10000 !important;
                        background: rgba(0,0,0,0.12);
                        overflow-y: auto;
                    }
                    .modal-responsive > button {
                        position: absolute !important;
                        top: 16px !important;
                        right: 16px !important;
                        left: auto !important;
                        z-index: 10001 !important;
                    }
                    .modal-responsive > div {
                        width: 100vw !important;
                        min-width: 0 !important;
                        max-width: 100vw !important;
                        padding: 24px 0 32px 0 !important;
                        border-radius: 0 !important;
                        margin-top: 56px !important;
                        background: white !important;
                    }
                }
            `}</style>
        </div>
    );
}
