# 🌱 BonMart

**BonMart** is an enterprise-grade e-commerce platform committed to **environmental friendliness** (Green E-commerce). It is built with a modern, scalable, and maintainable stack, following strict industry best practices to ensure excellent performance, accessibility, and a superior user experience.

The project currently resides in the **In Development** stage and is deployed via a **CI/CD pipeline**.

## ✨ Key Features

*   **Eco-Friendly Focus:** The core branding and ethos (the "Green" aspect) guide UI/UX decisions.
*   **Scalable Architecture:** Leverages Next.js for server-side rendering (SSR), static site generation (SSG), and API routes, suitable for enterprise-level traffic.
*   **Performance:** Optimized bundle sizes, fast loading times, and a high Lighthouse score.
*   **Responsive & Mobile-First:** Designed and developed with a **Mobile-First Approach** and **Responsive Web Design principles** to ensure seamless experience on any device.
*   **Theming:** Comprehensive support for **Light and Dark Themes** using CSS variables and Tailwind CSS.
*   **Global State Management:** Centralized state using **Redux Toolkit** for predictable and scalable data flow.
*   **Full-Stack Observability:** Integrated error tracking and performance monitoring to ensure zero-downtime reliability.

## 💻 Technologies & Stack


| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 15+ | Enterprise-grade React framework for performance and scaling. |
| **Observability** | Sentry | Full-stack error tracking and performance monitoring. |
| **Language** | TypeScript | Strong typing for maintainability and reducing runtime errors. |
| **Package Manager** | pnpm | Fast, disk-space efficient dependency management. |
| **State** | Redux Toolkit | Centralized, predictable state management. |
| **Styling** | Tailwind CSS v4 | Utility-first CSS framework for rapid, consistent styling. |
| **CSS Utilities** | `clsx` | Utility for conditionally joining class names. |
| **Linting** | ESLint | Code quality and enforcing style consistency. |
| **SVG Handling** | `@svgr/webpack` | Imports SVGs as optimized React components. |
| **Runtime** | Node.js | Backend environment for Next.js. |
| **Icons** | `lucide-react` | Open-source, consistent icon set. |

## 🛡️ Observability & Error Monitoring

To maintain the **enterprise-grade reliability** of BonMart, we have integrated **Sentry** as our primary observability suite. This ensures that every runtime exception—whether on the client, server, or edge—is captured with full context for rapid resolution.

### Multi-Layered Error Boundaries

We employ a robust, hierarchical error-catching strategy:

*   **Segment Error Boundaries (`error.tsx`):** Handled at the route level to preserve the application shell (Header/Footer) while providing a branded, interactive recovery UI using the `useTransition` hook.
*   **Global Fallback (`global-error.tsx`):** A dependency-free "emergency exit" that catches critical crashes in the Root Layout. It uses stable HEX values to ensure rendering even if CSS variables fail.
*   **Automatic Instrumentation:** Leverages Next.js `instrumentation.ts` to initialize Sentry across all runtimes (Browser, Node.js, and Edge) as early as possible.


## 🚀 Getting Started

Follow the instructions below to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following installed on your system:

*   **Node.js** (LTS version recommended)
*   **pnpm** (The package manager used for this project)

To install pnpm globally:

```bash
npm install -g pnpm
```

### Installation

1.  Proceed to GitHub, fork, then clone the repo.
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

Start the development server with the standard Webpack-based dev server for maximum stability with our custom loaders:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The application uses **Import Aliases** (e.g., `@/src/`) configured in `tsconfig.json` for cleaner imports.

## ⚙️ Configuration & Principles

Adherence to high-quality code and design standards is non-negotiable.

### Styling & Theming

*   **Global CSS Variables:** Found in `src/styles/globals.css`. These variables define the foundational design system (colors, typography, spacing). We utilize the latest Tailwind CSS v4 variable shorthand where appropriate.
*   **Light-Dark Themes:** A comprehensive light/dark theme is implemented using the Tailwind CSS `dark:` variant and CSS variables. This ensures the design is accessible and user-friendly in all lighting conditions.
*   **Utility-First:** Styling is primarily managed through Tailwind CSS classes, reducing the need for custom CSS and promoting consistency.

### State Management & Persistence

The application employs a robust, hybrid state management architecture designed for data durability, SEO optimization, and seamless hydration in a Next.js environment.

*   **Redux Toolkit (Centralized State):** Managed via the **FLUX pattern** with domain-driven **Slices** (e.g., `cart`, `wishlist`, `theme`).
*   **Enterprise Persistence Layer:**
    *   **Redux Persist:** Critical user data (Cart, Wishlist, Theme, and Search History) is whitelisted and persisted to `localStorage`, ensuring data survives page refreshes and browser sessions.
    *   **Next.js Hydration Safety:** Implements `PersistGate` within the `ReduxProvider` to prevent UI flickering and "Hydration Mismatch" errors by delaying rendering until the persisted state is fully rehydrated.
*   **URL-Driven State (Search):**
    *   Following SEO best practices, the active **Search Query** is synchronized with URL parameters (`?q=`).
    *   This ensures search results are **shareable**, **bookmarkable**, and fully accessible via the browser's back/forward navigation.
*   **Type-Safe Architecture:** Full TypeScript integration across the state layer, including typed hooks (`useAppSelector`, `useAppDispatch`) and exhaustive state interfaces for total maintainability.

### Accessibility (A11Y) & SEO

*   **WCAG Compliance:** Development strictly follows WCAG guidelines, including:
    *   **Semantic HTML:** Using the **right element for the right job** (e.g., `<button>` for actions, `<a>` for navigation, `<main>`, `<nav>`, `<aside>` for structure).
    *   **ARIA Attributes:** Appropriate use of `aria-*` attributes, especially for custom interactive components.
    *   **Keyboard Navigation:** Ensuring all interactive elements are reachable and operable via keyboard.
*   **SEO:** Next.js metadata and structured data are used to provide search engines with optimal information. Clean, semantically rich HTML structure is naturally SEO-friendly.

### Componentization & Naming

*   **Componentization:** The UI is broken down into small, reusable components (**Atomic Design** is a guiding methodology) to maintain the **Single Responsibility Principle (SRP)**.
*   **File Naming:**
    *   Component file names use **kebab-case** (e.g., `mobile-nav.tsx`).
    *   Component export names use **PascalCase** (e.g., `export default function MobileNav(...)`).

## 📦 Scripts Reference

These scripts are defined in your `package.json` and are run using `pnpm <script-name>`.


| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `next dev` | Starts the development server with custom Webpack configuration. |
| `build` | `next build` | Creates an optimized production build (used in CI/CD). |
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
