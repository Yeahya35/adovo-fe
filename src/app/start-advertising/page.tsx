'use client';

import Image from 'next/image';
import Link from 'next/link';

interface PricingFeature {
    included: boolean;
    text: string;
}

interface PricingTier {
    name: string;
    price: string;
    description: string;
    features: PricingFeature[];
    popular?: boolean;
    buttonText: string;
    buttonLink: string;
}

const pricingTiers: PricingTier[] = [
    {
        name: "Basic",
        price: "₺1,999",
        description: "Perfect for small businesses",
        features: [
            {included: true, text: "1 Region Coverage"},
            {included: true, text: "5 Display Hours/Day"},
            {included: true, text: "Basic Analytics"},
            {included: false, text: "Priority Support"},
            {included: false, text: "Custom Scheduling"}
        ],
        buttonText: "Get Started",
        buttonLink: "/register"
    },
    {
        name: "Professional",
        price: "₺3,999",
        description: "For growing businesses",
        popular: true,
        features: [
            {included: true, text: "3 Region Coverage"},
            {included: true, text: "12 Display Hours/Day"},
            {included: true, text: "Advanced Analytics"},
            {included: true, text: "Priority Support"},
            {included: true, text: "Custom Scheduling"}
        ],
        buttonText: "Get Started",
        buttonLink: "/register"
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For large organizations",
        features: [
            {included: true, text: "Unlimited Regions"},
            {included: true, text: "24/7 Display Time"},
            {included: true, text: "Custom Analytics"},
            {included: true, text: "Dedicated Account Manager"},
            {included: true, text: "API Access"}
        ],
        buttonText: "Contact Sales",
        buttonLink: "/contact"
    }
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function StartAdvertising() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md fixed w-full z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center">
                            <Image
                                src={`${basePath}/assets/img/adovo-logo.png`}
                                alt="ADOVO Logo"
                                width={40}
                                height={40}
                                className="transform hover:scale-105 transition-transform duration-200"
                            />
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/login"
                                className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                        Start Advertising with ADOVO
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Choose the perfect plan for your business and start reaching your target audience today
                    </p>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="max-w-7xl mx-auto px-4 pb-20">
                <div className="grid md:grid-cols-3 gap-8">
                    {pricingTiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative bg-white rounded-2xl shadow-xl p-8 border ${
                                tier.popular ? 'border-2 border-yellow-400' : 'border-yellow-100'
                            } hover:scale-105 transition-transform duration-200`}
                        >
                            {tier.popular && (
                                <div
                                    className="absolute top-0 right-0 bg-yellow-400 text-black px-4 py-1 rounded-bl-xl rounded-tr-xl font-medium">
                                    Popular
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
                            <p className="text-gray-600 mb-6">{tier.description}</p>
                            <div className="text-4xl font-bold mb-6">
                                {tier.price}
                                {tier.price !== "Custom" && <span className="text-lg text-gray-500">/month</span>}
                            </div>
                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        {feature.included ? (
                                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none"
                                                 stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 text-gray-300 mr-2" fill="none"
                                                 stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        )}
                                        {feature.text}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={tier.buttonLink}
                                className={`block w-full py-3 px-4 rounded-xl text-center font-medium transition-colors ${
                                    tier.name === "Professional"
                                        ? "bg-black text-white hover:bg-gray-800"
                                        : tier.name === "Enterprise"
                                            ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                            : "bg-yellow-400 text-black hover:bg-yellow-500"
                                }`}
                            >
                                {tier.buttonText}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">How does the region selection work?</h3>
                            <p className="text-gray-600">You can choose specific neighborhoods in Ankara where you want
                                your ads to appear. Our network of taxi displays will show your ads when in those
                                areas.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Can I change my plan later?</h3>
                            <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time.
                                Changes will take effect in the next billing cycle.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">What format should my ads be in?</h3>
                            <p className="text-gray-600">We accept static images and video ads in common formats (JPG,
                                PNG, MP4). Our team will help ensure your ads meet our display specifications.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 