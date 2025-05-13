 'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RegionSelector } from '@/components/campaign/region-selector';
import { MediaUpload } from '@/components/campaign/media-upload';
 import {createAdvertisement} from "@/app/services/advertismentService";

interface CampaignFormData {
  districts: string[];
  neighborhoods: number[];
  mediaFiles: File[];
}

export default function NewCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CampaignFormData>({
    districts: [],
    neighborhoods: [],
    mediaFiles: [],
  });

  const handleRegionSelection = (districts: string[], neighborhoods: number[]) => {
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
    if (step === 1 && formData.districts.length === 0) {
      alert('Please select at least one district');
      return;
    }
    if (step === 2 && formData.mediaFiles.length === 0) {
      alert('Please upload at least one media file');
      return;
    }
    setStep(prev => prev + 1);
  };

  // const handleSubmit = async () => {
  //   try {
  //     // TODO: Implement campaign submission logic
  //     console.log('Submitting campaign:', formData);
  //     router.push('/company-dashboard');
  //   } catch (error) {
  //     console.error('Error submitting campaign:', error);
  //   }
  // };
  //

  const handleSubmit = async () => {
    try {
      if (formData.mediaFiles.length === 0) {
        alert('Please upload at least one media file');
        return;
      }

      // Assume companyId comes from auth or token
      const companyId = 1;

      await createAdvertisement({
        name: 'LED Campaign',
        description: 'Outdoor LED Display Ads',
        display_duration: 10,
        file: formData.mediaFiles[0],
        region_name: 'Bilkent',
        companyId,
        regionIds: formData.neighborhoods,
      });

      router.push('/company-dashboard');
    } catch (error) {
      console.error('Error submitting campaign:', error);
      alert('Campaign submission failed');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {step === 1 ? 'Select Target Regions' : 'Upload Media'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <RegionSelector
              onSelectionChange={handleRegionSelection}
              selectedDistricts={formData.districts}
              selectedNeighborhoods={formData.neighborhoods}
            />
          )}
          {step === 2 && (
            <MediaUpload
              onFilesChange={handleMediaUpload}
              files={formData.mediaFiles}
            />
          )}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setStep(prev => prev - 1)}
              disabled={step === 1}
            >
              Previous
            </Button>
            {step === 2 ? (
              <Button onClick={handleSubmit}>Submit Campaign</Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
