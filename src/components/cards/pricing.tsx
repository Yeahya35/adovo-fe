interface PricingProps {
    handleContactSales: () => void;
    handleGetStarted: () => void;


}

export function PricingCard({
    handleContactSales,
    handleGetStarted,
}: PricingProps) {

    const pricingTiers = [
        {
            name: 'Starter',
            price: '€99',
            description: 'Perfect for small businesses',
            features: [
                '5 Asset Credits',
                'Basic Analytics',
                'Email Support',
                '1 Region Coverage'
            ],
            popular: false
        },
        {
            name: 'Professional',
            price: '€299',
            description: 'Ideal for growing businesses',
            features: [
                '20 Asset Credits',
                'Advanced Analytics',
                'Priority Support',
                '3 Region Coverage',
                'Custom Branding'
            ],
            popular: true
        },
        {
            name: 'Enterprise',
            price: '€999',
            description: 'For large-scale operations',
            features: [
                '100 Asset Credits',
                'Full Analytics Suite',
                '24/7 Support',
                'Unlimited Regions',
                'Custom Branding',
                'API Access',
                'Dedicated Account Manager'
            ],
            popular: false
        }
    ];


    return (
        <div className="mt-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
                <p className="text-xl text-gray-600">Select the perfect plan for your advertising needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingTiers.map((tier) => (
                    <div
                        key={tier.name}
                        className={`bg-white rounded-2xl shadow-xl p-8 border ${tier.popular ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-gray-200'
                            }`}
                    >
                        {tier.popular && (
                            <div className="absolute top-0 right-0 -mt-4 -mr-4">
                                <span className="bg-yellow-400 text-black text-sm font-semibold px-3 py-1 rounded-full">
                                    Most Popular
                                </span>
                            </div>
                        )}
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h2>
                        <p className="text-gray-600 mb-6">{tier.description}</p>
                        <div className="mb-8">
                            <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                            <span className="text-gray-600">/month</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {tier.features.map((feature) => (
                                <li key={feature} className="flex items-center">
                                    <svg
                                        className="h-5 w-5 text-yellow-400 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={handleGetStarted}
                            className={`w-full py-3 px-4 rounded-xl text-center font-medium transition-colors ${tier.popular
                                    ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Get Started
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a custom solution?</h2>
                <p className="text-gray-600 mb-6">
                    Contact our sales team for a tailored plan that fits your specific needs.
                </p>
                <button
                    onClick={handleContactSales}
                    className="bg-gray-900 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                    Contact Sales
                </button>
            </div>
        </div>
    )

}




