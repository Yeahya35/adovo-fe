'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

// Fix for default marker icons in Leaflet
const icon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

// Ankara districts data with coordinates and view counts
const ankaraDistricts = [
  { name: 'Çankaya', lat: 39.9334, lng: 32.8597, views: 12000, population: 920000 },
  { name: 'Keçiören', lat: 39.9676, lng: 32.8116, views: 8500, population: 920000 },
  { name: 'Yenimahalle', lat: 39.9199, lng: 32.8543, views: 7500, population: 650000 },
  { name: 'Mamak', lat: 39.9500, lng: 32.9167, views: 6800, population: 600000 },
  { name: 'Etimesgut', lat: 39.9500, lng: 32.6333, views: 6200, population: 550000 },
  { name: 'Sincan', lat: 39.9667, lng: 32.5833, views: 5800, population: 500000 },
  { name: 'Altındağ', lat: 39.9667, lng: 32.8667, views: 5200, population: 370000 },
  { name: 'Pursaklar', lat: 40.0333, lng: 32.8000, views: 4800, population: 150000 },
  { name: 'Gölbaşı', lat: 39.7833, lng: 32.8000, views: 4200, population: 120000 },
  { name: 'Polatlı', lat: 39.5833, lng: 32.1500, views: 3800, population: 110000 },
];

// Sample daily data
const displayData = [
  { name: 'Mon', displays: 2400 },
  { name: 'Tue', displays: 1398 },
  { name: 'Wed', displays: 9800 },
  { name: 'Thu', displays: 3908 },
  { name: 'Fri', displays: 4800 },
  { name: 'Sat', displays: 3800 },
  { name: 'Sun', displays: 4300 },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/company-dashboard" className="flex items-center text-gray-700 hover:text-gray-900">
                <ChevronLeft className="h-5 w-5" />
                <span className="ml-1">Back to Dashboard</span>
              </Link>
              <Link href="/company-dashboard">
                <Image
                  src="/assets/img/adovo-logo.png"
                  alt="ADOVO Logo"
                  width={40}
                  height={40}
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Campaign Analytics</h1>
          <div className="flex gap-4">
            <select className="border rounded-md px-3 py-2">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
            <select className="border rounded-md px-3 py-2">
              <option>All Campaigns</option>
              <option>Active Campaigns</option>
              <option>Completed Campaigns</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Impressions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">63,800</p>
              <p className="text-sm text-gray-500">+12% from last period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Daily Impressions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">9,114</p>
              <p className="text-sm text-gray-500">+8% from last period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing District</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Çankaya</p>
              <p className="text-sm text-gray-500">12,000 impressions</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="impressions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="impressions">Impressions</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="districts">Districts</TabsTrigger>
          </TabsList>

          <TabsContent value="impressions">
            <Card>
              <CardHeader>
                <CardTitle>Daily Impressions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={displayData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="displays" fill="#facc15" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations">
            <Card>
              <CardHeader>
                <CardTitle>Ad Display Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <MapContainer
                    center={[39.9334, 32.8597]}
                    zoom={11}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {ankaraDistricts.map((district) => (
                      <Marker
                        key={district.name}
                        position={[district.lat, district.lng]}
                        icon={icon}
                      >
                        <Popup>
                          <div>
                            <h3 className="font-bold">{district.name}</h3>
                            <p>{district.views.toLocaleString()} views</p>
                            <p className="text-sm text-gray-500">Population: {district.population.toLocaleString()}</p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="districts">
            <Card>
              <CardHeader>
                <CardTitle>District Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">District</th>
                        <th className="text-right py-3 px-4">Views</th>
                        <th className="text-right py-3 px-4">Population</th>
                        <th className="text-right py-3 px-4">Views per 1000</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ankaraDistricts.map((district) => (
                        <tr key={district.name} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{district.name}</td>
                          <td className="text-right py-3 px-4">{district.views.toLocaleString()}</td>
                          <td className="text-right py-3 px-4">{district.population.toLocaleString()}</td>
                          <td className="text-right py-3 px-4">
                            {((district.views / district.population) * 1000).toFixed(1)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 