// src/components/ui/icons.ts
import {
  // Common icons
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
  // Footer Icons
  Globe,
  // Theme Icons
  Sun,
  Moon,
  Monitor,
} from 'lucide-react';

export const appIcons = {
  // Common icons
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
  // Footer icons
  globe: Globe,
  // Theme Icons
  sun: Sun,
  moon: Moon,
  monitor: Monitor,
} as const;

export type IconName = keyof typeof appIcons;

export const isValidIconName = (name: string): name is IconName => {
  return name in appIcons;
};
