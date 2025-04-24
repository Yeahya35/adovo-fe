const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export const registerUser = async (formData: {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    company_name: string;
    phone_number: string;
    address: string;
}) => {
    try {
        const response = await fetch(`${BASE_URL}/core/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
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

export const login = async (username: string, password: string) => {
    try {
        const response = await fetch(`${BASE_URL}/core/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        const data = await response.json();

        console.log(data);
        if (data.username) {
            localStorage.setItem('username', data.username);
        }
        if (!response.ok) {
            throw new Error(data.message || 'Invalid credentials');
        }

        return data; // This is where you get the token or user data

    } catch (error: unknown) {
        // Ensure the error is of type Error
        if (error instanceof Error) {
            throw new Error(error.message || 'Something went wrong');
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};
