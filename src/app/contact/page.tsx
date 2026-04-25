'use client';

import { useState } from 'react';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                <p className="text-gray-600 mb-12">
                    Have a question or feedback? We'd love to hear from you.
                    Fill out the form below and our team will get back to you shortly.
                </p>

                {submitted ? (
                    <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-2xl text-center">
                        <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                        <p>Thank you for reaching out. We will get back to you soon.</p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="mt-6 text-green-700 font-semibold hover:underline"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Send Message
                            </button>
                        </form>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Office</h3>
                                <p className="text-gray-600">
                                    Nairobi, Kenya<br />
                                    Education Center, 4th Floor<br />
                                    Central Business District
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Get in Touch</h3>
                                <p className="text-gray-600">
                                    Email: info@edunews.co.ke<br />
                                    Phone: +254 703390743
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Follow Us</h3>
                                <div className="flex space-x-4 mt-2">
                                    <span className="text-gray-400 hover:text-blue-600 cursor-pointer transition-colors">Twitter</span>
                                    <span className="text-gray-400 hover:text-blue-800 cursor-pointer transition-colors">Facebook</span>
                                    <span className="text-gray-400 hover:text-blue-900 cursor-pointer transition-colors">LinkedIn</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
