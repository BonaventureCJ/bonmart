// src/components/search/search-form-wrapper.tsx

'use client';

import React, { Suspense } from 'react';
import { SearchForm } from './search-form';

/**
 * Static Bailout Isolation Wrapper
 * Prevents search client hooks from causing root-level compilation de-optimization.
 */
export const SearchFormWrapper: React.FC = () => {
    return (
        <Suspense fallback={<div className="h-11 w-full animate-pulse rounded-full bg-(--toggle-bg)" />}>
            <SearchForm />
        </Suspense>
    );
};
