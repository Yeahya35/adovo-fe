import axios from 'axios';
import { NextResponse } from 'next/server';

const DJANGO_API_URL = 'http://localhost:8000/api'; // Replace with your Django backend URL

export async function getHomeData() {
    try {
        const response = await axios.get(`${DJANGO_API_URL}/get_data/`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user data' },
            { status: 500 }
        );
    }
}

export async function getTestData() {
    try {
        const response = await axios.get(`${DJANGO_API_URL}/test/`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching test data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch test data' },
            { status: 500 }
        );
    }
}




export async function POST(request: Request) {
    try {
        const body = await request.json();
        const response = await axios.post(`${DJANGO_API_URL}/user/`, body);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error creating user data:', error);
        return NextResponse.json(
            { error: 'Failed to create user data' },
            { status: 500 }
        );
    }
}
