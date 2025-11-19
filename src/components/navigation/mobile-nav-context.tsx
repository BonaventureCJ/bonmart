// src/components/navigation/mobile-nav-context.tsx
'use client';

import {
    createContext,
    useContext,
    useState,
    type FC,
    type ReactNode,
} from 'react';

type MobileNavContextType = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    toggle: () => void;
};

const MobileNavContext = createContext<MobileNavContextType | null>(null);

export const MobileNavProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen((prev) => !prev);

    return (
        <MobileNavContext.Provider value={{ isOpen, setIsOpen, toggle }}>
            {children}
        </MobileNavContext.Provider>
    );
};

export const useMobileNav = () => {
    const context = useContext(MobileNavContext);
    if (!context) {
        throw new Error('useMobileNav must be used within a MobileNavProvider');
    }
    return context;
};
