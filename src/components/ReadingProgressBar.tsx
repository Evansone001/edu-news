'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
    const [completion, setCompletion] = useState(0);

    useEffect(() => {
        const updateScrollCompletion = () => {
            const currentProgress = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

            if (scrollHeight) {
                setCompletion(
                    Number((currentProgress / scrollHeight).toFixed(2)) * 100
                );
            }
        };

        window.addEventListener('scroll', updateScrollCompletion);

        return () => {
            window.removeEventListener('scroll', updateScrollCompletion);
        };
    }, []);

    return (
        <div className="fixed top-16 left-0 w-full h-1 z-50">
            <div
                className="h-full bg-blue-600 transition-all duration-150 ease-out"
                style={{ width: `${completion}%` }}
            />
        </div>
    );
}
