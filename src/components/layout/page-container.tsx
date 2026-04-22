// src/components/layout/page-container.tsx

export default function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full max-w-7xl p-0 sm:p-3 text-center">
            {children}
        </div>
    );
}
