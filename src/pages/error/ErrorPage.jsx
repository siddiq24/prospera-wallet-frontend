import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                {/* Error Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="bg-red-100 rounded-full p-6">
                            <ExclamationTriangleIcon className="h-16 w-16 text-red-600" />
                        </div>
                        <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                            404
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                    <p className="text-lg text-gray-600 mb-2">
                        Molecule end time test cum sitar puncte or palitentengue sur verbe. Is liquid.
                    </p>
                    <p className="text-lg text-gray-600">
                        Nise ajustant ou pleine, equie autum autum une ritumy in reluite any.
                    </p>
                </div>

                {/* ELECO ADJEE Section */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">ELECO ADJEE</h2>
                    <p className="text-gray-600 mb-6">
                        The page you're looking for doesn't exist or has been moved.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                        >
                            <HomeIcon className="h-5 w-5 mr-2" />
                            Go Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                        >
                            Go Back
                        </button>
                    </div>
                </div>

                {/* Additional Help */}
                <div className="text-sm text-gray-500">
                    <p>If you believe this is an error, please contact support.</p>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;