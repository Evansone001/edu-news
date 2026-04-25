'use client';

import HeaderClient from '@/components/layout/Header/HeaderClientWrapper';
import Footer from '@/components/layout/Footer/Footer';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">About EDU NEWS</h1>

                    <div className="prose prose-blue lg:prose-lg text-gray-600">
                        <p className="mb-6">
                            EDU NEWS is a platform dedicated to sharing educational insights, teaching resources,
                            and learning materials. Our mission is to make quality education accessible, understandable, and actionable for
                            both students and educators.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Our Vision</h2>
                        <p className="mb-6">
                            To be the most trusted and comprehensive source of educational content and learning resources,
                            connecting students and educators, and promoting excellence in education.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What We Offer</h2>
                        <ul className="list-disc pl-6 mb-8 space-y-2">
                            <li>Expert teaching tips and educational strategies</li>
                            <li>Study guides and learning materials</li>
                            <li>Comprehensive educational resources and curriculum support</li>
                            <li>A platform for educators to share insights and best practices</li>
                        </ul>

                        <div className="bg-blue-50 p-8 rounded-2xl mt-12">
                            <h3 className="text-xl font-bold text-blue-900 mb-4">Our Commitment</h3>
                            <p className="text-blue-800 italic">
                                "We believe that quality education and accessible learning resources are essential
                                components of a thriving society. EDU NEWS is dedicated to empowering
                                students and educators with the knowledge and tools they need to succeed."
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
