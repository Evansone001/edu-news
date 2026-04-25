'use client';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

                <div className="prose prose-blue lg:prose-lg text-gray-600 space-y-6">
                    <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

                    <p>
                        At NewSheria, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
                        and safeguard your information when you visit our website.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
                    <p>
                        We collect information that you provide directly to us, such as when you create an account, subscribe to our
                        newsletter, or contact us for support. This may include your name, email address, and any other information
                        you choose to provide.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Send you technical notices and support messages</li>
                        <li>Communicate with you about products, services, and events</li>
                        <li>Monitor and analyze trends and usage</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at info@sherianews.co.ke.
                    </p>
                </div>
            </div>
        </div>
    );
}
