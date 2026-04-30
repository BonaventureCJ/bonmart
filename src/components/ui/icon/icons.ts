// src/components/ui/icon/icons.ts

import {
  ArrowRight,
  ArrowLeft,
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
  Lock,
  Printer,
  Trash2,
  ExternalLink,
  RefreshCw, // Added for "Try Again" recovery actions
} from 'lucide-react';

/**
 * Centralized Icon Registry for Bonmart.
 * Maps semantic names to Lucide component icons.
 * This ensures consistency and makes it easy to swap icon sets globally.
 */
export const appIcons = {
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
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
  lock: Lock,
  printer: Printer,
  trash: Trash2,
  externalLink: ExternalLink,
  refresh: RefreshCw, // Registered for use in Error boundaries and refresh actions
} as const;

/**
 * Type derived from the keys of our icon registry.
 * Provides full IntelliSense when using the Icon component.
 */
export type IconName = keyof typeof appIcons;

/**
 * Type Guard to verify if a string is a valid IconName at runtime.
 */
export const isValidIconName = (name: string): name is IconName => name in appIcons;
