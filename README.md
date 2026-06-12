# BonMart: Enterprise Eco-Commerce

BonMart is an enterprise-grade "Green E-commerce" platform engineered for high-performance sustainability. Built with the **Next.js 15 App Router** and **React 19**, it serves as a technical showcase for scalable state management, optimized rendering pipelines, and zero-runtime-error TypeScript architectures.

---

## 🏗️ Technical Architecture & Principles

This project is built on the foundation of **clean code** and **advanced software engineering practices**:

*   **Atomic Componentization**: Adherence to the **Single Responsibility Principle (SRP)**, breaking UI into highly reusable, logic-decoupled components.
*   **Automated Code Quality**: Strict **ESLint** integration for enforcing industry-standard linting rules and consistent code style, ensuring high maintainability in collaborative enterprise environments.
*   **Semantic HTML & A11Y**: WCAG-compliant development using appropriate ARIA roles and keyboard-accessible navigation.
*   **Scalable Design System**: Advanced implementation of **Tailwind CSS v4** with a primitive-to-semantic token pipeline.
*   **Mobile-First RWD**: Fluid responsive design system ensuring parity across all device classes, featuring an aesthetic, high-fidelity UI/UX for navigation and interactive elements.
*   **File Architecture Convention**: Enforces kebab-case for component file names (e.g., `product-card.tsx`) and PascalCase for exported symbols (e.g., `export function ProductCard()`).

---

## 🎨 Enterprise Design Token System

The styling architecture is designed for **maximum maintainability** and **brand agility**. By decoupling raw values from semantic intent in `globals.css`, the platform can be rebranded or restyled in seconds without touching component-level code.

### 1. Primitive Design Tokens
Raw values for colors, spacing, and motion are defined within the `@theme` directive.
*   **Centralized Brand Control**: Primary brand colors (e.g., `--color-brand-primary`) are mapped once at the root, allowing for global color shifts by changing a single hex code.
*   **Enterprise Spacing Scale**: Standardized section gaps and paddings (e.g., `--spacing-section-lg`) ensure visual rhythm and consistency.

### 2. Semantic Variable Mapping
Primitive tokens are mapped to semantic variables (e.g., `--brand-color`, `--surface-raised`) within the `:root` selector.
*   **Decoupled Logic**: Components consume intent (e.g., "background color") rather than specific hex values, ensuring the UI remains robust during design iterations.
*   **Tailwind v4 Variable Shorthand**: Efficient use of modern syntax (e.g., `text-(--foreground)`) keeps the DOM lean and styling logic expressive.

---

## 🚀 Engineering Excellence & Performance

### 1. High-Performance State Normalization
To solve the complexity of managing thousands of product units (SKUs), BonMart utilizes **Redux Toolkit 2.0** with a normalized data structure:
*   **Algorithmic Efficiency**: By implementing `createEntityAdapter`, data lookups and updates achieve **$O(1)$ complexity**, eliminating the performance tax of deeply nested arrays.
*   **Referential Stability**: Memoized selectors created via `Reselect` ensure that components only re-render when their specific data slice changes.
*   **Strict Memoization**: Strategic use of `shallowEqual` result checks to block wasteful re-render cascades in high-frequency UI elements.

### 2. URL-Driven State & SEO Synchronization
BonMart treats the **URL as the single source of truth** for all functional states:
*   **Synchronized Navigation**: Search queries (`?q=`), sorting matrices (`?sort=`), and category filters (`?category=`) are bi-directionally synced with the URL.
*   **SEO Optimization**: By lifting state to URL parameters, search results are fully crawlable and shareable, maximizing organic visibility.
*   **Server-Side Hydration**: Leverages Next.js Server Components to read URL state during the request phase, eliminating "hydration flashes."

### 3. Type-Safe Enterprise Infrastructure
*   **Robust TypeScript**: Exhaustive use of interfaces, generics, and custom-typed hooks for a zero `any` codebase.
*   **Persistence Layer**: Durable state via `redux-persist`, ensuring the Cart, Wishlist, and Theme survive page refreshes.
*   **Concurrent Rendering**: Implementation of React 19 `useTransition` for non-blocking UI updates during heavy filtering operations.

---

## 🧪 Automated Testing Layer & Pipeline Integration

BonMart deploys a highly responsive, high-density testing matrix driven by **Vitest** and **React Testing Library**. The framework targets data transformation pipelines, custom layout hooks, and state slices with zero browser overhead.

### 1. Core Testing Strategies
*   **State Isolation Architecture**: Because `redux-persist` binds to browser storage engines, it is extracted from testing environments. Tests consume a custom factory utility (`renderWithProviders`) that instantiates a raw, fresh Redux store for every test script, completely eliminating cross-test state leaks.
*   **Global Ambient Primitives**: Configured with `globals: true`, eliminating framework imports. Tests utilize the explicit `test` primitive block over `it` to ensure clear intent and scannable code.
*   **Temporal Chronology Isolation**: Time-sensitive workflows (such as inputs using `useDebounce`) are verified using Vitest Fake Timers (`vi.useFakeTimers()`), accelerating execution pipelines.

### 2. Type-Safe Static Casts & Troubleshooting
To maintain strict compliance with `@typescript-eslint/no-explicit-any` while mocking read-only DOM attributes (e.g., `window.innerHeight` or `HTMLElement.offsetHeight`) under **JSDOM**, the codebase enforces casting mutations through an intermediate `unknown` step rather than `any`:

```typescript
/* Correct: Writable Descriptor Casting Configuration */
(window as unknown as { innerHeight: number }).innerHeight = 540;
(mockElement as unknown as { offsetHeight: number }).offsetHeight = 64;
```

### 3. Execution Infrastructure Commands
```bash
# Run interactive test suite runner (Watch Mode)
pnpm test

# Execute test blocks exactly once and exit (CI/CD Pipelines)
pnpm test:run

# Generate comprehensive codebase test coverage reports
pnpm test:coverage
```

---

## 🛠️ Technology Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 15.5+ | Turbopack-powered App Router & Server Components |
| **UI Library** | React 19 | Actions API and Concurrent Rendering primitives |
| **State** | RTK 2.0 | Normalized Entity Adapters & Logic-driven Slices |
| **Styling** | Tailwind v4 | CSS-first engine with native variable shorthand |
| **Testing** | Vitest 4.1+ | Blazing-fast unit & integration test runner |
| **DOM Engine**| JSDOM | In-memory web-standard browser environment simulation |
| **Typing** | TypeScript 5 | Strict-mode type safety across the entire stack |
| **Package Manager**| pnpm | Efficient, fast dependency management |

---

## ⚙️ Development

### Prerequisites
* **Node.js** (LTS version)
* **pnpm** (Installed globally via `npm install -g pnpm`)

### Installation & Execution
```bash
# Clone the repository and install dependencies
git clone https://github.com/your-username/bonmart.git
cd bonmart
pnpm install

# Run the local Development Server (Turbopack)
pnpm dev

# Code formatting and lint inspection
pnpm lint

# Compile and build for Production
pnpm build
pnpm start
```
