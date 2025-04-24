const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getRegionTree = async (): Promise<Record<string, { id: number; neighbourhood: string }[]>> => {
    try {
        const response = await fetch(`${BASE_URL}/adovo/regions`, {
            method: 'GET',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch regions');
        }

        return data; // returns { "Çankaya": ["Çankaya", "Yıldız", ...], ... }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Something went wrong while fetching regions');
        } else {
            throw new Error('An unknown error occurred while fetching regions');
        }
    }
};
