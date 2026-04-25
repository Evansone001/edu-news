'use client';

import { Suspense } from 'react';
import Home from '../page';

export default function BlogPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <Home />
        </Suspense>
    );
}
