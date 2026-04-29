// src/components/layout/page-container.tsx

/**
 * PageContainer Component
 * Provides a standardized max-width and horizontal centering.
 * Spacing is managed by the parent LayoutWrapper to ensure consistency.
 */
export default function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto w-full max-w-7xl">
            {children}
        </div>
    );
}
