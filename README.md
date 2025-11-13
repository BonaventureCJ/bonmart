This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




FOLDER STRUCTURE:
bonmart/
│
├── app/                                   # Next.js App Router
│   ├── (public)/                          # Publicly accessible routes (e.g., home, about)
│   │   ├── layout.tsx                     # Root layout (header, footer, providers)
│   │   ├── page.tsx                       # Homepage
│   │   └── loading.tsx                    # Global loading fallback
│   │
│   ├── (shop)/                            # E-commerce specific routes
│   │   ├── products/
│   │   │   ├── page.tsx                   # Product listing page
│   │   │   └── [productId]/page.tsx       # Dynamic product detail page
│   │   ├── cart/page.tsx                  # Cart page
│   │   ├── checkout/page.tsx              # Checkout flow
│   │   └── orders/page.tsx                # Order history
│   │
│   ├── (auth)/                            # Authentication-related routes
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── reset-password/page.tsx
│   │
│   ├── api/                               # Server-side route handlers (Next.js API routes)
│   │   ├── products/route.ts              # Example: fetch or proxy products API
│   │   └── auth/route.ts
│   │
│   ├── not-found.tsx                      # Custom 404 page
│   └── error.tsx                          # Global error boundary
│
├── components/                            # Reusable UI components
│   ├── common/                            # Shared, generic components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Spinner.tsx
│   │
│   ├── layout/                            # Layout-related components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   │
│   ├── product/                           # Product-specific components
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── ProductDetails.tsx
│   │
│   └── cart/                              # Cart-related UI components
│       ├── CartItem.tsx
│       └── CartSummary.tsx
│
├── features/                              # Redux Toolkit feature slices
│   ├── cart/
│   │   ├── cartSlice.ts
│   │   └── cartSelectors.ts
│   ├── products/
│   │   ├── productsSlice.ts
│   │   └── productsSelectors.ts
│   └── user/
│       ├── userSlice.ts
│       └── userSelectors.ts
│
├── hooks/                                 # Reusable React hooks
│   ├── useMediaQuery.ts
│   ├── useDebounce.ts
│   ├── useToggle.ts
│   └── useClientOnly.ts
│
├── lib/                                   # Core utilities and singletons
│   ├── axiosClient.ts                     # Axios instance or fetch wrapper
│   ├── helpers.ts                         # General helper functions
│   ├── constants.ts                       # Constant values
│   ├── seo.config.ts                      # Default SEO config
│   └── utils.ts                           # Utility functions
│
├── providers/                             # Context or global providers
│   ├── ThemeProvider.tsx
│   ├── ReduxProvider.tsx
│   └── QueryProvider.tsx                  # If using React Query later
│
├── services/                              # API service layers (abstract API logic)
│   ├── productService.ts
│   ├── userService.ts
│   └── orderService.ts
│
├── styles/                                # Tailwind and global styles
│   ├── globals.css
│   ├── typography.css
│   ├── animations.css
│   └── tailwind.css
│
├── types/                                 # TypeScript type definitions
│   ├── product.d.ts
│   ├── cart.d.ts
│   ├── user.d.ts
│   └── index.d.ts
│
├── utils/                                 # Helper functions and utilities
│   ├── formatCurrency.ts
│   ├── getDiscountPrice.ts
│   └── generateSlug.ts
│
├── public/                                # Static assets (images, icons, etc.)
│   ├── images/
│   ├── icons/
│   └── favicons/
│
├── .eslintrc.json                         # Linting configuration
├── .prettierrc                            # Code formatting configuration
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── next.config.ts
└── package.json



ENHANCED FOLDER STRUCTURE USING SRC FOLDER:
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
