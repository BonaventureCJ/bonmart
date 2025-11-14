/* "use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export const ThemeToggleButton = () => {
  const { isDark, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after the component has mounted on the client
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return null to prevent hydration mismatch
  }

  // The isDark state from your useTheme hook directly reflects the current mode
  const getIcon = () => {
    return isDark ? (
      <LucideMoon aria-hidden="true" className="h-5 w-5" />
    ) : (
      <LucideSun aria-hidden="true" className="h-5 w-5" />
    );
  };

  const getLabel = () => {
    return `Switch to ${isDark ? "light" : "dark"} mode`;
  };

  return (
    <button
      onClick={toggle}
      aria-label={getLabel()}
      className={clsx(
        "p-2 rounded-full transition-colors duration-300",
        "bg-surface-light dark:bg-neutral-bg-dark",
        "text-neutral-text-light dark:text-neutral-text-dark",
        "hover:bg-gray-200 dark:hover:bg-gray-800",
        "focus:outline-none focus-visible:focus-ring-dual"
      )}
    >
      {getIcon()}
    </button>
  );
};
 */