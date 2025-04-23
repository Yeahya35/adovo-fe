'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RegionSelectorProps {
  onSelectionChange: (districts: string[], neighborhoods: string[]) => void;
  selectedDistricts: string[];
  selectedNeighborhoods: string[];
}

// Sample data for Ankara districts and neighborhoods
const ANKARA_DISTRICTS = {
  'Çankaya': ['Çankaya', 'Kavaklıdere', 'Gaziosmanpaşa', 'Yıldız'],
  'Keçiören': ['Keçiören', 'Etlik', 'Sanatoryum', 'Aktaş'],
  'Yenimahalle': ['Yenimahalle', 'Batıkent', 'Şentepe', 'Demetevler'],
  'Mamak': ['Mamak', 'Kutludüğün', 'Altıağaç', 'Hürel'],
  'Etimesgut': ['Etimesgut', 'Bağlıca', 'Yapracık', 'Göksu'],
  'Sincan': ['Sincan', 'Yenikent', 'Temelli', 'Lalahan'],
};

export function RegionSelector({
  onSelectionChange,
  selectedDistricts,
  selectedNeighborhoods,
}: RegionSelectorProps) {
  const [expandedDistrict, setExpandedDistrict] = useState<string | null>(null);

  const handleDistrictChange = (district: string, checked: boolean) => {
    const newDistricts = checked
      ? [...selectedDistricts, district]
      : selectedDistricts.filter(d => d !== district);
    
    const newNeighborhoods = checked
      ? [...selectedNeighborhoods, ...ANKARA_DISTRICTS[district as keyof typeof ANKARA_DISTRICTS]]
      : selectedNeighborhoods.filter(n => !ANKARA_DISTRICTS[district as keyof typeof ANKARA_DISTRICTS].includes(n));

    onSelectionChange(newDistricts, newNeighborhoods);
  };

  const handleNeighborhoodChange = (district: string, neighborhood: string, checked: boolean) => {
    const newNeighborhoods = checked
      ? [...selectedNeighborhoods, neighborhood]
      : selectedNeighborhoods.filter(n => n !== neighborhood);

    const newDistricts = newNeighborhoods.length > 0
      ? [...selectedDistricts, district]
      : selectedDistricts.filter(d => d !== district);

    onSelectionChange(newDistricts, newNeighborhoods);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Select Target Regions</h3>
        <span className="text-sm text-gray-500">
          {selectedDistricts.length} districts, {selectedNeighborhoods.length} neighborhoods selected
        </span>
      </div>
      <ScrollArea className="h-[400px] rounded-lg border border-yellow-100 p-4">
        <div className="space-y-4">
          {Object.entries(ANKARA_DISTRICTS).map(([district, neighborhoods]) => (
            <div key={district} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={district}
                  checked={selectedDistricts.includes(district)}
                  onCheckedChange={(checked) => handleDistrictChange(district, checked as boolean)}
                  className="border-yellow-400 data-[state=checked]:bg-yellow-400"
                />
                <Label
                  htmlFor={district}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  onClick={() => setExpandedDistrict(expandedDistrict === district ? null : district)}
                >
                  {district}
                </Label>
              </div>
              {expandedDistrict === district && (
                <div className="ml-6 space-y-2">
                  {neighborhoods.map((neighborhood) => (
                    <div key={neighborhood} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${district}-${neighborhood}`}
                        checked={selectedNeighborhoods.includes(neighborhood)}
                        onCheckedChange={(checked) => handleNeighborhoodChange(district, neighborhood, checked as boolean)}
                        className="border-yellow-400 data-[state=checked]:bg-yellow-400"
                      />
                      <Label
                        htmlFor={`${district}-${neighborhood}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {neighborhood}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
} 