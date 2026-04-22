// src/components/ui/icon/icons.ts

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
  Globe,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react';

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
  globe: Globe,
  sun: Sun,
  moon: Moon,
  monitor: Monitor,
} as const;

export type IconName = keyof typeof appIcons;

export const isValidIconName = (name: string): name is IconName => name in appIcons;
