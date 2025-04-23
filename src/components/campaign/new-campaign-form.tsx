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
  pricingMethod: 'per_impression' | 'per_day' | 'per_week' | 'per_month';
  districts: string[];
  neighborhoods: string[];
  mediaFiles: File[];
}

export function NewCampaignForm({ onClose }: NewCampaignFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CampaignFormData>({
    pricingMethod: 'per_impression',
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
      <div className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Pricing Method</h3>
            <RadioGroup
              defaultValue={formData.pricingMethod}
              onValueChange={handlePricingMethodChange}
              className="grid gap-4"
            >
              <Card className="p-4 border-yellow-100 hover:border-yellow-300 transition-colors">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="per_impression" id="per_impression" />
                  <Label htmlFor="per_impression" className="flex-1">
                    <div>
                      <p className="font-medium">Per Impression</p>
                      <p className="text-sm text-gray-500">Pay for each time your ad is displayed</p>
                    </div>
                  </Label>
                </div>
              </Card>
              <Card className="p-4 border-yellow-100 hover:border-yellow-300 transition-colors">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="per_day" id="per_day" />
                  <Label htmlFor="per_day" className="flex-1">
                    <div>
                      <p className="font-medium">Per Day</p>
                      <p className="text-sm text-gray-500">Fixed price for daily display</p>
                    </div>
                  </Label>
                </div>
              </Card>
              <Card className="p-4 border-yellow-100 hover:border-yellow-300 transition-colors">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="per_week" id="per_week" />
                  <Label htmlFor="per_week" className="flex-1">
                    <div>
                      <p className="font-medium">Per Week</p>
                      <p className="text-sm text-gray-500">Fixed price for weekly display</p>
                    </div>
                  </Label>
                </div>
              </Card>
              <Card className="p-4 border-yellow-100 hover:border-yellow-300 transition-colors">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="per_month" id="per_month" />
                  <Label htmlFor="per_month" className="flex-1">
                    <div>
                      <p className="font-medium">Per Month</p>
                      <p className="text-sm text-gray-500">Fixed price for monthly display</p>
                    </div>
                  </Label>
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