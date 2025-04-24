'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RegionSelector } from '@/components/campaign/region-selector';
import { MediaUpload } from '@/components/campaign/media-upload';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface NewCampaignFormProps {
  onClose: () => void;
}

interface CampaignFormData {
  pricingMethod: 'starter' | 'professional' | 'enterprise';
  districts: string[];
  neighborhoods: string[];
  mediaFiles: File[];
}

export function NewCampaignForm({ onClose }: NewCampaignFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CampaignFormData>({
    pricingMethod: 'starter',
    districts: [],
    neighborhoods: [],
    mediaFiles: [],
  });

  const handlePricingMethodChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      pricingMethod: value as CampaignFormData['pricingMethod'],
    }));
  };

  const handleRegionSelection = (districts: string[], neighborhoods: string[]) => {
    setFormData(prev => ({
      ...prev,
      districts,
      neighborhoods,
    }));
  };

  const handleMediaUpload = (files: File[]) => {
    setFormData(prev => ({
      ...prev,
      mediaFiles: files,
    }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.pricingMethod) {
      alert('Please select a pricing method');
      return;
    }
    if (step === 2 && formData.districts.length === 0) {
      alert('Please select at least one district');
      return;
    }
    if (step === 3 && formData.mediaFiles.length === 0) {
      alert('Please upload at least one media file');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    try {
      // TODO: Implement campaign submission logic
      console.log('Submitting campaign:', formData);
      onClose();
    } catch (error) {
      console.error('Error submitting campaign:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <div className={`flex items-center ${step >= 1 ? 'text-yellow-500' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 1 ? 'bg-yellow-500 text-white' : 'bg-gray-100'
          }`}>
            1
          </div>
          <span className="ml-2 text-sm font-medium">Pricing</span>
        </div>
        <div className={`flex-1 h-0.5 ${step >= 2 ? 'bg-yellow-500' : 'bg-gray-200'}`} />
        <div className={`flex items-center ${step >= 2 ? 'text-yellow-500' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 2 ? 'bg-yellow-500 text-white' : 'bg-gray-100'
          }`}>
            2
          </div>
          <span className="ml-2 text-sm font-medium">Regions</span>
        </div>
        <div className={`flex-1 h-0.5 ${step >= 3 ? 'bg-yellow-500' : 'bg-gray-200'}`} />
        <div className={`flex items-center ${step >= 3 ? 'text-yellow-500' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 3 ? 'bg-yellow-500 text-white' : 'bg-gray-100'
          }`}>
            3
          </div>
          <span className="ml-2 text-sm font-medium">Media</span>
        </div>
      </div>

      {/* Form Content */}
      <div className="space-x-6">
        {step === 1 && (
          <div className="space-x-4">
            <h3 className="text-lg font-semibold">Select Your Plan</h3>
            <RadioGroup
              defaultValue={formData.pricingMethod}
              onValueChange={handlePricingMethodChange}
              className="flex flex-row gap-2"
            >
              <Card className="p-6 border-yellow-100 hover:border-yellow-300 transition-colors">
                <div className="flex items-start space-x-4">
                  <RadioGroupItem value="starter" id="starter" />
                  <div className="flex-1">
                    <Label htmlFor="starter" className="text-lg font-semibold">
                      Starter Plan
                    </Label>
                    <div className="mt-2 space-y-2">
                      <p className="text-2xl font-bold">₺6,000 <span className="text-sm font-normal text-gray-500">/month</span></p>
                      <p className="text-sm text-gray-600">₺2,000 profit/taxi</p>
                      <ul className="mt-4 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> 1 Taxi
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> Up to 8 Ad Slots
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> Basic Targeting (district-based)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> Monthly Reports
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> Email Support
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-yellow-100 hover:border-yellow-300 transition-colors">
                <div className="flex items-start space-x-4">
                  <RadioGroupItem value="professional" id="professional" />
                  <div className="flex-1">
                    <Label htmlFor="professional" className="text-lg font-semibold">
                      Professional Plan
                    </Label>
                    <div className="mt-2 space-y-2">
                      <p className="text-2xl font-bold">₺12,000 <span className="text-sm font-normal text-gray-500">/month</span></p>
                      <p className="text-sm text-gray-600">₺8,000 profit across 2 taxis</p>
                      <ul className="mt-4 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> 2 Taxis
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> Up to 20 Ad Slots
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> Real-time Location Targeting
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> Weekly Reports
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> Priority Support
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> Custom Scheduling
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-yellow-100 hover:border-yellow-300 transition-colors">
                <div className="flex items-start space-x-4">
                  <RadioGroupItem value="enterprise" id="enterprise" />
                  <div className="flex-1">
                    <Label htmlFor="enterprise" className="text-lg font-semibold">
                      Enterprise Plan
                    </Label>
                    <div className="mt-2 space-y-2">
                      <p className="text-2xl font-bold">₺25,000 <span className="text-sm font-normal text-gray-500">/month</span></p>
                      <p className="text-sm text-gray-600">₺13,000 profit across 3 taxis</p>
                      <ul className="mt-4 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> 3 Taxis
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> Up to 50 Ad Slots
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> Street-Level Targeting
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> Live Dashboard
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> 24/7 Support
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> Dedicated Account Manager
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-yellow-500">•</span> API Access
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </RadioGroup>
          </div>
        )}
        {step === 2 && (
          <RegionSelector
            onSelectionChange={handleRegionSelection}
            selectedDistricts={formData.districts}
            selectedNeighborhoods={formData.neighborhoods}
          />
        )}
        {step === 3 && (
          <MediaUpload
            onFilesChange={handleMediaUpload}
            files={formData.mediaFiles}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-yellow-100">
        <Button
          variant="outline"
          onClick={() => setStep(prev => prev - 1)}
          disabled={step === 1}
          className="border-yellow-200 hover:bg-yellow-50"
        >
          Previous
        </Button>
        {step === 3 ? (
          <Button
            onClick={handleSubmit}
            className="bg-yellow-400 hover:bg-yellow-500 text-black"
          >
            Submit Campaign
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="bg-yellow-400 hover:bg-yellow-500 text-black"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
} 