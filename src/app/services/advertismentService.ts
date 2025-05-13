const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface AdvertisementForm {
    name: string;
    description: string;
    display_duration: number;
    file: File;
    region_name: string;
    companyId: number; // or string, depending on backend
    regionIds: number[];
}

export const createAdvertisement = async ({
                                              name,
                                              description,
                                              display_duration,
                                              file,
                                              regionIds,
                                              region_name
                                          }: AdvertisementForm) => {
    try {
        const formData = new FormData();
        let userId = localStorage.getItem('userId');
        formData.append('name', name);
        formData.append('description', description);
        formData.append('region_name', region_name);
        formData.append('display_duration', display_duration.toString());
        if (userId == null) {
            userId = "3";
        }
        formData.append('company', userId);
        formData.append('fileUpload', file);
        regionIds.forEach(id => formData.append('region_ids', id.toString()));

        const response = await fetch(`${BASE_URL}/adovo/advertisements/`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create advertisement');
        }

        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Something went wrong');
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export const getAdvertisementsByUserId = async (userId: number | string) => {

    const companyId = localStorage.getItem('userId');
    const response = await fetch(`${BASE_URL}/adovo/advertisements/by-user/?user_id=${companyId}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user advertisements');
    }

    return data;
};

