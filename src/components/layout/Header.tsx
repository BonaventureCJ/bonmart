// src/components/Header.tsx
import BonMartLogo from "@/assets/icons/bonmart-logo.svg";

const Header = () => {
  return (
    <header className="w-full max-w-7xl flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <BonMartLogo
          className="w-10 h-10 text-brand sync-transition"
          aria-label="BonMart Logo"
        />
        <p className="text-xl font-bold">
          <span className="text-brand sync-transition">Bon</span>
          <span className="text-neutral-text-light dark:text-neutral-text-dark sync-transition">Mart</span>
        </p>
      </div>

      {/* The ThemeToggleButton is now in the Footer */}
    </header>
  );
};

export default Header;
