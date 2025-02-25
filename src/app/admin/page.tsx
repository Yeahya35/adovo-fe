'use client';

import {useEffect, useState} from 'react';
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

export default function Admin() {
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
            {/* Features Section */}
            <section className="py-20 bg-white">
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
