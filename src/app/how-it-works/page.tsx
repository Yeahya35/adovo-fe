'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface StepProps {
  number: number;
  title: string;
  description: string;
  image: string;
}

const steps: StepProps[] = [
  {
    number: 1,
    title: "Choose Your Region",
    description: "Select specific areas in Ankara where you want your advertisements to appear. Target neighborhoods with your ideal customer demographic.",
    image: "/steps/region-select.jpg" // Add appropriate image
  },
  {
    number: 2,
    title: "Design Your Campaign",
    description: "Upload your advertisements and customize how they appear. Set your campaign duration and display preferences.",
    image: "/steps/campaign-design.jpg"
  },
  {
    number: 3,
    title: "Set Your Schedule",
    description: "Choose specific times of day for your ads to display. Target rush hours or specific time slots that work best for your business.",
    image: "/steps/schedule.jpg"
  },
  {
    number: 4,
    title: "Go Live",
    description: "Your ads start displaying on our network of taxi displays, reaching potential customers throughout Ankara.",
    image: "/steps/live-display.jpg"
  }
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md fixed w-full z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/img/adovo-logo.png"
                alt="ADOVO Logo"
                width={40}
                height={40}
                className="transform hover:scale-105 transition-transform duration-200"
              />
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/register"
                className="px-6 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            How ADOVO Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your advertising reach with our innovative location-based taxi display network
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {steps.map((step, index) => (
          <div 
            key={step.number}
            className={`flex flex-col md:flex-row items-center gap-8 mb-20 ${
              index % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="flex-1">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xl">
                {step.number}
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
              <p className="text-lg text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-yellow-50 rounded-2xl">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Location Targeting</h3>
              <p className="text-gray-600">Display your ads in specific neighborhoods and areas of Ankara</p>
            </div>
            <div className="p-6 bg-yellow-50 rounded-2xl">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Time Scheduling</h3>
              <p className="text-gray-600">Choose specific times of day for your ads to appear</p>
            </div>
            <div className="p-6 bg-yellow-50 rounded-2xl">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-gray-600">Track your campaign performance with detailed metrics</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join the future of location-based advertising in Ankara
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors font-medium"
            >
              Create Account
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all font-medium"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 