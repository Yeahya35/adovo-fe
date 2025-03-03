'use client';

import {useEffect, useRef, useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {useRouter} from 'next/navigation';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface StepProps {
    number: string;
    title: string;
    description: string;
}

export default function Home() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            setIsLoggedIn(true);
            setUserName(userData.first_name || 'User');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-sm animate-slide-down">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/adovo-logo.png"
                                alt="ADOVO Logo"
                                width={60}
                                height={60}
                                className="transform hover:scale-110 transition-transform duration-300 drop-shadow-md"
                            />
                        </Link>
                        <div className="flex items-center space-x-4" >
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="px-6 py-2 text-black hover:text-black font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                    <span className="text-black">Welcome, {userName}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="px-6 py-2 text-black hover:text-black font-medium"
                                    >
                                        Sign out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="px-6 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors font-medium"
                                    >
                                        Log in
                                    </Link>
                                </>
                            )}
                            <Link
                                href="/about"
                                className="px-6 py-2 text-black hover:text-black font-medium"
                            >
                                About Us
                            </Link>
                            <Link
                                href="/contact"
                                className="px-6 py-2 text-black hover:text-black font-medium"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {isLoggedIn ? (
                // Dashboard Content
                <div className="pt-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Quick Actions Card */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-100">
                                <h2 className="text-xl font-semibold mb-4 text-black">Quick Actions</h2>
                                <div className="space-y-4">
                                    <Link
                                        href="/region-select"
                                        className="block w-full py-3 px-4 bg-yellow-400 text-black rounded-xl text-center font-medium hover:bg-yellow-500 transition-colors"
                                    >
                                        Create New Campaign
                                    </Link>
                                    <button
                                        className="block w-full py-3 px-4 bg-gray-100 text-black rounded-xl text-center font-medium hover:bg-gray-200 transition-colors">
                                        View Analytics
                                    </button>
                                </div>
                            </div>

                            {/* Active Campaigns Card */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-100">
                                <h2 className="text-xl font-semibold mb-4 text-black">Active Campaigns</h2>
                                <div className="space-y-4">
                                    <p className="text-black">No active campaigns yet.</p>
                                    <Link
                                        href="/region-select"
                                        className="text-black hover:text-yellow-700 font-medium inline-flex items-center"
                                    >
                                        Start your first campaign
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M9 5l7 7-7 7"/>
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            {/* Statistics Card */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-100">
                                <h2 className="text-xl font-semibold mb-4 text-black">Campaign Statistics</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-black">Total Views</span>
                                        <span className="font-semibold text-black">0</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-black">Active Regions</span>
                                        <span className="font-semibold text-black">0</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-black">Total Campaigns</span>
                                        <span className="font-semibold text-black">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Landing Page Content
                <div className="pb-10">
                    <section className="relative w-full h-[100vh] overflow-hidden">
                        {/* Video Background */}
                        <div className="absolute inset-0 w-full h-full">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{ objectFit: 'cover' }}
                            >
                                <source src="/assets/videos/adovo-intro.mp4" type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                            {/* Dark overlay for better text readability */}
                            <div className="absolute inset-0 bg-black/50"></div>
                        </div>

                        {/* Content */}
                        <div className="relative flex flex-col justify-center items-center text-center h-full z-10 px-4">
                            <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 animate-fade-in">
                                Transform Your <span className="text-yellow-500">Advertising</span> with Location-Based Taxi Displays
                            </h1>
                            <p className="text-xl text-white mb-8 max-w-3xl">
                                Reach your target audience where they are with ADOVO's dynamic taxi-top advertising platform in Ankara
                            </p>
                            <div className="flex gap-6">
                                <Link
                                    href="/register"
                                    className="px-10 py-4 bg-yellow-400 text-black rounded-full hover:bg-yellow-300 transition-all duration-200 transform hover:scale-105 font-medium text-lg"
                                >
                                    Start Advertising
                                </Link>
                                <Link
                                    href="/learn-more"
                                    className="px-10 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-200 transform hover:scale-105 font-medium text-lg"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>

            )}

            {/* Features Section */}
            <section className="pt-10 pb-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-black text-center mb-16">Why Choose ADOVO?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            title="Location-Based"
                            description="Dynamic advertising that changes based on taxi location for maximum relevance"
                            icon={
                                <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            }
                        />
                        <FeatureCard
                            title="Real-Time Analytics"
                            description="Track your campaign performance with detailed metrics and insights"
                            icon={
                                <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                </svg>
                            }
                        />
                        <FeatureCard
                            title="Wide Coverage"
                            description="Reach diverse audiences across Ankara with our taxi network"
                            icon={
                                <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                                </svg>
                            }
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 w-full h-full">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/background.mp4" type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Content */}
                <div className="relative container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8 text-white">Ready to Transform Your Advertising?</h2>
                    <p className="text-xl mb-8 text-white">
                        Join the future of location-based advertising in Ankara
                    </p>
                    <Link
                        href="/register"
                        className="inline-block px-8 py-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-300 transition-all duration-200 transform hover:scale-105 font-semibold"
                    >
                        Start Your Campaign
                    </Link>
                </div>
            </section>
        </div>
    );
}

const FeatureCard = ({title, description, icon}: FeatureCardProps) => (
    <div
        className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex justify-center mb-4 transform hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
        <p className="text-black">{description}</p>
    </div>
);

const Step = ({number, title, description}: StepProps) => (
    <div className="flex flex-col items-center text-center">
        <div
            className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold mb-4">
            {number}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
        <p className="text-black">{description}</p>
    </div>
);
