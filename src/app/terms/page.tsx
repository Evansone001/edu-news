'use client';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

                <div className="prose prose-blue lg:prose-lg text-gray-600 space-y-6">
                    <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

                    <p>
                        Welcome to NewSheria. By using our website, you agree to comply with and be bound by the following terms
                        and conditions of use.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Acceptance of Terms</h2>
                    <p>
                        By accessing or using NewSheria, you agree to be bound by these Terms of Service and all applicable laws
                        and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Use License</h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on News
                        Sheria's website for personal, non-commercial transitory viewing only.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Disclaimer</h2>
                    <p>
                        The materials on NewSheria's website are provided on an 'as is' basis. NewSheria makes no warranties,
                        expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
                        implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
                        of intellectual property or other violation of rights.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Governing Law</h2>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of Kenya and you
                        irrevocably submit to the exclusive jurisdiction of the courts in Nairobi.
                    </p>
                </div>
            </div>
        </div>
    );
}
