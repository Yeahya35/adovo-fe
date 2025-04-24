'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Check if user is logged in
        const username = localStorage.getItem('username');
        if (!username) {
            router.push('/login');
            return;
        }

        setUserName(username || 'Guest');
    }, [router]);

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";


    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link href="/dashboard">
                                <Image
                                    src={`${basePath}/assets/img/adovo-logo.png`}
                                    alt="ADOVO Logo"
                                    width={40}
                                    height={40}
                                />
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link 
                                href="/pricing" 
                                className="text-sm font-medium text-yellow-600 hover:text-yellow-700 px-3 py-2 rounded-lg hover:bg-yellow-50 transition-colors"
                            >
                                Pricing
                            </Link>
                            <span className="text-gray-700">Welcome, {userName}</span>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('user');
                                    router.push('/login');
                                }}
                                className="text-sm text-gray-700 hover:text-gray-900"
                            >
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Quick Actions Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-100">
                        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                        <div className="space-y-4">
                            <Link
                                href="/region-select"
                                className="block w-full py-3 px-4 bg-yellow-400 text-black rounded-xl text-center font-medium hover:bg-yellow-500 transition-colors"
                            >
                                Create New Campaign
                            </Link> 
                            <button
                                className="block w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl text-center font-medium hover:bg-gray-200 transition-colors">
                                View Analytics
                            </button>
                        </div>
                    </div>

                    {/* Active Campaigns Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-100">
                        <h2 className="text-xl font-semibold mb-4">Active Campaigns</h2>
                        <div className="space-y-4">
                            <p className="text-gray-600">No active campaigns yet.</p>
                            <Link
                                href="/region-select"
                                className="text-yellow-600 hover:text-yellow-700 font-medium inline-flex items-center"
                            >
                                Start your first campaign
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M9 5l7 7-7 7"/>
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Statistics Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-100">
                        <h2 className="text-xl font-semibold mb-4">Campaign Statistics</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Views</span>
                                <span className="font-semibold">0</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Active Regions</span>
                                <span className="font-semibold">0</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Campaigns</span>
                                <span className="font-semibold">0</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
              
            </div>
        </div>
    );
} 