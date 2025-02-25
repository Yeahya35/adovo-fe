'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md fixed w-full z-10 shadow-sm">
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
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="px-6 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors font-medium"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-black mb-6 animate-fade-in">
              How ADOVO Works
            </h1>
            <p className="text-xl text-black mb-8">
              Discover how our innovative taxi-top advertising platform transforms your marketing reach
            </p>
          </div>

          {/* Process Steps */}
          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-black">Choose Your Region</h3>
                <p className="text-black">
                  Select specific neighborhoods in Ankara where you want your advertisements to appear. 
                  Target areas with high foot traffic, business districts, or your ideal customer demographic.
                </p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-xl">
                <Image
                  src="/learn-more/region-select.jpg"
                  alt="Region Selection"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-yellow-50 p-6 rounded-xl md:order-1">
                <Image
                  src="/learn-more/campaign-setup.jpg"
                  alt="Campaign Setup"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-black">Design Your Campaign</h3>
                <p className="text-black">
                  Upload your advertisements and set campaign parameters. Choose display times, 
                  duration, and frequency. Our platform supports both static images and video content.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-black">Track Performance</h3>
                <p className="text-black">
                  Monitor your campaign's performance in real-time through our advanced analytics 
                  dashboard. Track impressions, engagement, and location-based metrics to optimize 
                  your advertising strategy.
                </p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-xl">
                <Image
                  src="/learn-more/analytics.jpg"
                  alt="Analytics Dashboard"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Link
              href="/register"
              className="inline-block px-8 py-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105 font-medium"
            >
              Start Your Campaign
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 