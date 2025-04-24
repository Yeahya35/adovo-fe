'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {Modal} from '@/components/ui/modal';
import {NewCampaignForm} from '@/components/campaign/new-campaign-form';
import {getAdvertisementsByUserId} from "@/app/services/advertismentService";


interface Advertisement {
    id: number;
    name: string;
    fileUpload: string;
    regions: string[];
}


export default function Dashboard() {
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);

    const [ads, setAds] = useState<Advertisement[]>([]);

    useEffect(() => {
        // const user = localStorage.getItem('user');
        // if (!user) return;
        //
        // const userData = JSON.parse(user);
        // const userId = userData.id; // assuming user ID is stored like this
        // setUserName(userData.first_name || 'User');

        getAdvertisementsByUserId(12)
            .then(setAds)
            .catch(err => console.error('Error loading ads:', err));
    }, []);


    useEffect(() => {
        // Check if user is logged in
        const username = localStorage.getItem('username');
        if (!username) {
            router.push('/login');
            return;
        }

        setUserName(username || 'Guest');
        // setUserName(userData|| 'User');
    }, [router]);

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

    const handleCampaignSubmitted = () => {
        setIsCampaignModalOpen(false);
        getAdvertisementsByUserId(12) // you can replace 12 with dynamic user ID if needed
            .then(setAds)
            .catch(err => console.error('Error refreshing ads:', err));
    };


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
                            <button
                                onClick={() => setIsCampaignModalOpen(true)}
                                className="block w-full py-3 px-4 bg-yellow-400 text-black rounded-xl text-center font-medium hover:bg-yellow-500 transition-colors"
                            >
                                Create New Campaign
                            </button>
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


                    {/* Image Cards Grid */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-100">
                            <h2 className="text-xl font-semibold mb-4 text-black">Your Advertisements</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {ads.length > 0 ? (
                                    ads.map((ad) => (
                                        <div key={ad.id} className="mb-4">
                                            {/* Sample Image Cards - You can map through your actual data here */}
                                            <div className="relative group overflow-hidden rounded-lg">
                                                 <div className="w-full h-[300px] relative">
                                                    <Image
                                                        src={ad.fileUpload}
                                                        alt={ad.name}
                                                        height={350}
                                                        width={350}
                                                        objectFit="cover"
                                                        className="transform group-hover:scale-110 transition-transform duration-200"
                                                    />
                                                </div>
                                                <div
                                                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                                        <h3 className="text-white font-semibold truncate">Campaign
                                                            Title</h3>
                                                        <div className="flex items-center justify-between mt-2">
                                                            <span className="text-yellow-400 text-sm">Active</span>
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    className="p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                                                                    <svg className="w-4 h-4 text-white" fill="none"
                                                                         stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round"
                                                                              strokeLinejoin="round" strokeWidth="2"
                                                                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                                                    </svg>
                                                                </button>
                                                                <button
                                                                    className="p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                                                                    <svg className="w-4 h-4 text-white" fill="none"
                                                                         stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round"
                                                                              strokeLinejoin="round" strokeWidth="2"
                                                                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">No advertisements yet.</p>
                                )}

                            </div>


                        </div>
                    </div>


                </div>
            </div>

            {/* Campaign Form Modal */}
            <Modal
                isOpen={isCampaignModalOpen}
                onClose={() => setIsCampaignModalOpen(false)}
                title="Create New Campaign"
            >
                <NewCampaignForm
                    onClose={() => setIsCampaignModalOpen(false)}
                    onSubmitSuccess={handleCampaignSubmitted}
                />
            </Modal>
        </div>
    );
}
