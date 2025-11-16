// src/components/ui/icons.ts
import {
    ArrowRight,
    Menu,
    Home,
    ShoppingCart,
    Search,
    User,
    Heart,
    Star,
    Loader2,
    ChevronRight,
    ChevronLeft,
    X,
    Plus,
    Minus,
    Check,
    AlertCircle,
} from "lucide-react";

// TODO: Remove all these and import only the icons the application actually uses
export const appIcons = {
    arrowRight: ArrowRight,
    menu: Menu,
    home: Home,
    cart: ShoppingCart,
    search: Search,
    user: User,
    heart: Heart,
    star: Star,
    loader: Loader2,
    chevronRight: ChevronRight,
    chevronLeft: ChevronLeft,
    close: X,
    plus: Plus,
    minus: Minus,
    check: Check,
    alertCircle: AlertCircle,
} as const;

// Strongly-typed icon name union
export type IconName = keyof typeof appIcons;

// Runtime validation for icon names
export const isValidIconName = (name: string): name is IconName => {
    return name in appIcons;
};