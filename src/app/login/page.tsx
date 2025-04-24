'use client';

import {useRouter} from "next/navigation";
import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {LoginForm} from "@/components/login-form";
import {login} from "@/app/services/authService";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Use the login service from the service layer
            const data = await login(username, password);

            // Store token
            localStorage.setItem('token', data.token);

            // Redirect to dashboard
            router.push('/company-dashboard');
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message); // Handle error from the service layer
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start align-middle">
                    <div className="flex items-center gap-2 font-medium">
                        <Link href="/"
                              className="flex justify-center transform hover:scale-105 transition-transform duration-200">
                            <Image
                                src="/assets/img/adovo-logo.png"
                                alt="ADOVO Logo"
                                width={50}
                                height={50}
                            />
                        </Link>
                        <a href="#"> Adovo </a>
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm
                            username={username}
                            setUsername={setUsername}
                            password={password}
                            setPassword={setPassword}
                            handleSubmit={handleSubmit}
                            isLoading={isLoading}
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="/assets/img/taxi-fleet.jpg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
