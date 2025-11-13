export default function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full max-w-7xl p-4 sm:p-8 text-center">
            {children}
        </div>
    );
}
