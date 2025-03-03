'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function About() {
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
              About ADOVO
            </h1>
            <p className="text-xl text-black mb-8">
              Revolutionizing outdoor advertising in Ankara through innovative taxi-top displays
            </p>
          </div>

          {/* Our Story Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-4">Our Story</h2>
            <p className="text-black mb-4">
              Founded in 2024, ADOVO emerged from a vision to transform the traditional advertising landscape in Ankara. 
              We recognized the potential of combining location-based technology with the city's extensive taxi network 
              to create a dynamic advertising platform.
            </p>
            <p className="text-black mb-4">
              Our journey began with a small team of innovators who believed in the power of smart, targeted advertising. 
              Today, we're proud to be leading the revolution in outdoor advertising technology.
            </p>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-4">Our Team</h2>
            <div className="bg-white p-6 rounded-xl shadow-md mb-4">
              <p className="text-black mb-6">
                Welcome to ADOVO, a team of passionate engineers and innovators from Bilkent University's 
                electrical and industrial engineering departments. Our mission is to revolutionize 
                location-based advertising through innovative taxi-top display solutions in urban transportation.
              </p>
              
              <h3 className="text-xl font-semibold text-black mb-6">Meet Our Team:</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-3 rounded-full bg-gray-200 overflow-hidden">
                    <Image
                      src="/assets/members/mehmet-kaan.jpeg"
                      alt="Mehmet Kaan Yıldız"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="font-medium text-black">Mehmet Kaan Yıldız</h4>
                  <p className="text-sm text-gray-600">Hardware Engineer</p>
                </div>
                
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-3 rounded-full bg-gray-200 overflow-hidden">
                    <Image
                      src="/assets/members/deniz-dogru.jpeg"
                      alt="Deniz Doğru"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="font-medium text-black">Deniz Doğru</h4>
                  <p className="text-sm text-gray-600">General Manager</p>
                </div>
                
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-3 rounded-full bg-gray-200 overflow-hidden">
                    <Image
                      src="/assets/members/eren-altay.jpeg"
                      alt="Eren Altay Mahmutoğlu"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="font-medium text-black">Eren Altay Mahmutoğlu</h4>
                  <p className="text-sm text-gray-600">Project Manager</p>
                </div>
                
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-3 rounded-full bg-gray-200 overflow-hidden">
                    <Image
                      src="/assets/members/cagla-burcu-ozeren.jpeg"
                      alt="Çağla Burcu Özeren"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="font-medium text-black">Çağla Burcu Özeren</h4>
                  <p className="text-sm text-gray-600">Marketing Manager</p>
                </div>
                
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-3 rounded-full bg-gray-200 overflow-hidden">
                    <Image
                      src="/assets/members/deniz-saglam.jpeg"
                      alt="Deniz Berke Sağlam"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="font-medium text-black">Deniz Berke Sağlam</h4>
                  <p className="text-sm text-gray-600">Technical Manager</p>
                </div>
                
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-3 rounded-full bg-gray-200 overflow-hidden">
                    <Image
                      src="/assets/members/mert-budur.jpeg"
                      alt="Mert Budur"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="font-medium text-black">Mert Budur</h4>
                  <p className="text-sm text-gray-600">Business Manager</p>
                </div>
                
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-3 rounded-full bg-gray-200 overflow-hidden">
                    <Image
                      src="/assets/members/omerhan-tacyildiz.png"
                      alt="Ömerhan Taçıldız"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="font-medium text-black">Ömerhan Taçıldız</h4>
                  <p className="text-sm text-gray-600">Software Engineer</p>
                </div>
              </div>
              
              <p className="text-black">
                What started as a senior project has evolved into a comprehensive business solution, 
                combining our technical expertise in electrical systems and industrial processes with 
                real-world applications. Together, we're transforming the digital advertising landscape 
                in Ankara through innovative technology and data-driven solutions.
              </p>
            </div>
          </div>

          {/* Our Mission Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-4">Our Mission</h2>
            <p className="text-black mb-4">
              At ADOVO, we're committed to providing businesses with smart, effective advertising solutions that reach 
              the right audience at the right time. Our mission is to make location-based advertising accessible, 
              measurable, and impactful for businesses of all sizes.
            </p>
          </div>

          {/* How We Work Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-4">How We Work</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-black mb-3">Technology</h3>
                <p className="text-black">
                  Our platform utilizes advanced GPS tracking and real-time analytics to ensure your 
                  advertisements reach your target audience effectively. We continuously monitor and 
                  optimize display performance for maximum impact.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-black mb-3">Partnership</h3>
                <p className="text-black">
                  We work closely with Ankara's taxi fleet to maintain a reliable and extensive network 
                  of digital displays. Our partnership approach ensures quality service and consistent 
                  coverage across the city.
                </p>
              </div>
            </div>
          </div>

          {/* Our Values Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-4">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Innovation</h3>
                <p className="text-black">Constantly improving our technology and services</p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Transparency</h3>
                <p className="text-black">Clear communication and honest reporting</p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Quality</h3>
                <p className="text-black">Delivering excellence in every campaign</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Link
              href="/register"
              className="inline-block px-8 py-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105 font-medium"
            >
              Start Advertising With Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 