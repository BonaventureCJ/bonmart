## 🌱 Project Overview

**BonMart** is an enterprise-grade e-commerce platform committed to **environmental friendliness** (Green E-commerce). It is built with a modern, scalable, and maintainable stack, following strict industry best practices to ensure excellent performance, accessibility, and a superior user experience.

The project currently resides in the **In Development** stage and is deployed via a **CI/CD pipeline**.

## ✨ Key Features

  * **Eco-Friendly Focus:** The core branding and ethos (the "Green" aspect) guide UI/UX decisions.
  * **Scalable Architecture:** Leverages Next.js for server-side rendering (SSR), static site generation (SSG), and API routes, suitable for enterprise-level traffic.
  * **Performance:** Optimized bundle sizes, fast loading times, and a high Lighthouse score.
  * **Responsive & Mobile-First:** Designed and developed with a **Mobile-First Approach** and **Responsive Web Design principles** to ensure seamless experience on any device.
  * **Theming:** Comprehensive support for **Light and Dark Themes** using CSS variables and Tailwind CSS.
  * **Global State Management:** Centralized state using **Redux Toolkit** for predictable and scalable data flow.

## 💻 Technologies & Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 15+ | Enterprise-grade React framework for performance and scaling. |
| **Language** | TypeScript | Strong typing for maintainability and reducing runtime errors. |
| **Package Manager** | pnpm | Fast, disk-space efficient dependency management. |
| **State** | Redux Toolkit | Centralized, predictable state management. |
| **Styling** | Tailwind CSS v4 | Utility-first CSS framework for rapid, consistent styling. |
| **CSS Utilities** | `clsx` | Utility for conditionally joining class names. |
| **Linting** | ESLint | Code quality and enforcing style consistency. |
| **SVG Handling** | `@svgr/webpack` | Imports SVGs as optimized React components. |
| **Runtime** | Node.js | Backend environment for Next.js. |
| **Icons** | `lucide-react` | Open-source, consistent icon set. |

## 🚀 Getting Started

Follow the instructions below to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following installed on your system:

  * **Node.js** (LTS version recommended)
  * **pnpm** (The package manager used for this project)

To install pnpm globally:

```bash
npm install -g pnpm
```

### Installation

1.  Proceed to GitHub, fork, then clone the repo:

2.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/bonmart.git
    cd bonmart
    ```
3.  Install all dependencies:
    ```bash
    pnpm install
    ```

### Running the Development Server

Start the development server with **Turbopack** for the fastest local development experience:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The application uses **Import Aliases** (e.g., `@/src/`) configured in `tsconfig.json` for cleaner imports.

## 📂 Project Structure

Following enterprise Next.js best practices, the project is structured for clear separation of concerns, supporting the **Single Responsibility Principle (SRP)**. Note that the project structure may be updated during the process of development to align with best practices and to adapt to project needs.

```
bonmart/
│
├── src/
│   ├── app/                               # Next.js App Router
│   │   ├── (public)/                      # Publicly accessible routes
│   │   │   ├── layout.tsx                 # Root layout (includes ThemeProvider, ReduxProvider)
│   │   │   ├── page.tsx                   # Homepage
│   │   │   └── loading.tsx                # Global loading state
│   │   │
│   │   ├── (shop)/                        # E-commerce-specific routes
│   │   │   ├── products/
│   │   │   │   ├── page.tsx               # Product listing
│   │   │   │   └── [productId]/page.tsx   # Product details
│   │   │   ├── cart/page.tsx              # Cart
│   │   │   ├── checkout/page.tsx          # Checkout
│   │   │   └── orders/page.tsx            # Order history
│   │   │
│   │   ├── (auth)/                        # Authentication routes
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── reset-password/page.tsx
│   │   │
│   │   ├── api/                           # Next.js API routes
│   │   │   ├── products/route.ts
│   │   │   └── auth/route.ts
│   │   │
│   │   ├── not-found.tsx                  # 404
│   │   └── error.tsx                      # Global error handler
│   │
│   ├── components/                        # Reusable UI components
│   │   ├── common/                        # Generic, reusable building blocks
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Spinner.tsx
│   │   │
│   │   ├── layout/                        # Layout and navigation
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   │
│   │   ├── product/                       # Product-related components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── ProductDetails.tsx
│   │   │
│   │   └── cart/                          # Cart-related UI components
│   │       ├── CartItem.tsx
│   │       └── CartSummary.tsx
│   │
│   ├── features/                          # Redux Toolkit feature slices
│   │   ├── cart/
│   │   │   ├── cartSlice.ts
│   │   │   └── cartSelectors.ts
│   │   ├── products/
│   │   │   ├── productsSlice.ts
│   │   │   └── productsSelectors.ts
│   │   └── user/
│   │       ├── userSlice.ts
│   │       └── userSelectors.ts
│   │
│   ├── hooks/                             # Reusable React hooks
│   │   ├── useMediaQuery.ts
│   │   ├── useDebounce.ts
│   │   ├── useToggle.ts
│   │   └── useClientOnly.ts
│   │
│   ├── lib/                               # Core libraries, singletons, and helpers
│   │   ├── axiosClient.ts                 # Preconfigured Axios/fetch client
│   │   ├── helpers.ts                     # Generic helper functions
│   │   ├── constants.ts                   # Constant values
│   │   ├── seo.config.ts                  # SEO defaults and metadata
│   │   └── utils.ts                       # Utility functions
│   │
│   ├── providers/                         # Application-level providers
│   │   ├── ThemeProvider.tsx
│   │   ├── ReduxProvider.tsx
│   │   └── QueryProvider.tsx              # Optional for React Query
│   │
│   ├── services/                          # API abstraction layer
│   │   ├── productService.ts
│   │   ├── userService.ts
│   │   └── orderService.ts
│   │
│   ├── styles/                            # Global and shared styles
│   │   ├── globals.css
│   │   ├── typography.css
│   │   ├── animations.css
│   │   └── tailwind.css
│   │
│   ├── types/                             # TypeScript definitions
│   │   ├── product.d.ts
│   │   ├── cart.d.ts
│   │   ├── user.d.ts
│   │   └── index.d.ts
│   │
│   ├── utils/                             # Utility functions
│   │   ├── formatCurrency.ts
│   │   ├── getDiscountPrice.ts
│   │   └── generateSlug.ts
│   │
│   └── __tests__/                         # Unit/integration tests (optional)
│       ├── components/
│       └── features/
│
├── public/                                # Static files (images, icons, etc.)
│   ├── images/
│   ├── icons/
│   └── favicons/
│
├── .eslintrc.json                         # ESLint config
├── .prettierrc                            # Prettier config
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── package.json

```

## ⚙️ Configuration & Principles

Adherence to high-quality code and design standards is non-negotiable.

### Styling & Theming

  * **Global CSS Variables:** Found in `src/styles/globals.css`. These variables define the foundational design system (colors, typography, spacing). We utilize the latest Tailwind CSS v4 variable shorthand where appropriate.
  * **Light-Dark Themes:** A comprehensive light/dark theme is implemented using the Tailwind CSS `dark:` variant and CSS variables. This ensures the design is accessible and user-friendly in all lighting conditions.
  * **Utility-First:** Styling is primarily managed through Tailwind CSS classes, reducing the need for custom CSS and promoting consistency.

### State Management

  * **Redux Toolkit:** The centralized state is managed using Redux Toolkit, following the **FLUX pattern**. State is organized into **Slices** based on domain (e.g., `theme-slice`, `navigation-slice`).
  * **TypeScript Best Practices:** All Redux actions, state, and selectors are fully typed, ensuring type safety throughout the state layer.

### Accessibility (A11Y) & SEO

  * **WCAG Compliance:** Development strictly follows WCAG guidelines, including:
      * **Semantic HTML:** Using the **right element for the right job** (e.g., `<button>` for actions, `<a>` for navigation, `<main>`, `<nav>`, `<aside>` for structure).
      * **ARIA Attributes:** Appropriate use of `aria-*` attributes, especially for custom interactive components.
      * **Keyboard Navigation:** Ensuring all interactive elements are reachable and operable via keyboard.
  * **SEO:** Next.js metadata and structured data are used to provide search engines with optimal information. Clean, semantically rich HTML structure is naturally SEO-friendly.

### Componentization & Naming

  * **Componentization:** The UI is broken down into small, reusable components (**Atomic Design** is a guiding methodology) to maintain the **Single Responsibility Principle (SRP)**.
  * **File Naming:**
      * Component file names use **kebab-case** (e.g., `mobile-nav.tsx`).
      * Component export names use **PascalCase** (e.g., `export default function MobileNav(...)`).

## 📦 Scripts Reference

These scripts are defined in your `package.json` and are run using `pnpm <script-name>`.

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `next dev --turbopack` | Starts the development server with optimized HMR. |
| `build` | `next build --turbopack` | Creates an optimized production build (used in CI/CD). |
| `start` | `next start` | Starts the Next.js production server. |
| `lint` | `eslint` | Runs ESLint to enforce code quality and style. |

## 🤝 Contributing

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project.
2.  Clone the repository: git clone https://github.com/your-username/bonmart.git
3.  Create your Feature Branch (`git switch -c feature/AmazingFeature`).
4.  Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`).
5.  Push to the Branch (`git push origin feature/AmazingFeature`).
6.  Open a Pull Request.

**Note:** All code must pass the `pnpm lint` check and adhere to the established project principles (TypeScript, RWD, A11Y, etc.).

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

-----


