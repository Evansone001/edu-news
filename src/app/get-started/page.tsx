import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Started - Sheria Legal',
  description: 'Get started with Sheria Legal - Professional legal intelligence platform',
};

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Started with Sheria Legal
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join our professional legal intelligence platform
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-semibold mb-4">Choose Your Path</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Sign Up</h3>
                <p className="text-gray-600 mb-4">Create a new account to access legal insights</p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Create Account
                </button>
              </div>
              
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Sign In</h3>
                <p className="text-gray-600 mb-4">Access your existing account</p>
                <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-black transition-colors">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
