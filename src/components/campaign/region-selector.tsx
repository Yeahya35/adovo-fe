'use client';

import {useEffect, useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import {Label} from '@/components/ui/label';
import {ScrollArea} from '@/components/ui/scroll-area';
import {getRegionTree} from '@/app/services/regionService';

interface RegionSelectorProps {
    onSelectionChange: (districts: string[], neighborhoods: number[]) => void;
    selectedDistricts: string[];
    selectedNeighborhoods: number[];
}

interface Neighborhood {
    id: number;
    neighbourhood: string;
}

export function RegionSelector({
                                   onSelectionChange,
                                   selectedDistricts,
                                   selectedNeighborhoods,
                               }: RegionSelectorProps) {
    const [regionTree, setRegionTree] = useState<Record<string, Neighborhood[]>>({});
    const [expandedDistrict, setExpandedDistrict] = useState<string | null>(null);

    useEffect(() => {
        getRegionTree()
            .then(setRegionTree)
            .catch(err => console.error('Failed to fetch regions:', err.message));
    }, []);

    const handleDistrictChange = (district: string, checked: boolean) => {
        const neighborhoods = regionTree[district] || [];
        const neighborhoodIds = neighborhoods.map(n => n.id);

        const newDistricts = checked
            ? [...selectedDistricts, district]
            : selectedDistricts.filter(d => d !== district);

        const newNeighborhoods = checked
            ? [...selectedNeighborhoods, ...neighborhoodIds]
            : selectedNeighborhoods.filter(id => !neighborhoodIds.includes(id));

        onSelectionChange(newDistricts, newNeighborhoods);
    };

    const handleNeighborhoodChange = (district: string, neighborhood: Neighborhood, checked: boolean) => {
        const newNeighborhoods = checked
            ? [...selectedNeighborhoods, neighborhood.id]
            : selectedNeighborhoods.filter(id => id !== neighborhood.id);

        const neighborhoodsInDistrict = regionTree[district] || [];
        const remainingInDistrict = newNeighborhoods.filter(id =>
            neighborhoodsInDistrict.some(n => n.id === id)
        );

        const newDistricts = remainingInDistrict.length > 0
            ? [...new Set([...selectedDistricts, district])]
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
                    {Object.entries(regionTree).map(([district, neighborhoods]) => (
                        <div key={district} className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id={district}
                                    checked={selectedDistricts.includes(district)}
                                    onCheckedChange={(checked) =>
                                        handleDistrictChange(district, checked as boolean)
                                    }
                                    className="border-yellow-400 data-[state=checked]:bg-yellow-400"
                                />
                                <Label
                                    htmlFor={district}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                    onClick={() =>
                                        setExpandedDistrict(
                                            expandedDistrict === district ? null : district
                                        )
                                    }
                                >
                                    {district}
                                </Label>
                            </div>
                            {expandedDistrict === district && (
                                <div className="ml-6 space-y-2">
                                    {neighborhoods.map((neighborhood) => (
                                        <div key={neighborhood.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`${district}-${neighborhood.id}`}
                                                checked={selectedNeighborhoods.includes(neighborhood.id)}
                                                onCheckedChange={(checked) =>
                                                    handleNeighborhoodChange(district, neighborhood, checked as boolean)
                                                }
                                                className="border-yellow-400 data-[state=checked]:bg-yellow-400"
                                            />
                                            <Label
                                                htmlFor={`${district}-${neighborhood.id}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {neighborhood.neighbourhood}
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