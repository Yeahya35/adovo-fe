import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"form"> {
    username: string;
    setUsername: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    navigateToRegister: (e: React.FormEvent) => void;
    isLoading: boolean;
}

export function LoginForm({
                              className,
                              username,
                              setUsername,
                              password,
                              navigateToRegister,
                              setPassword,
                              handleSubmit,
                              isLoading,
                              ...props
                          }: LoginFormProps) {

    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="m@example.com"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                            Forgot your password?
                        </a>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </Button>
                <div
                    className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
                <Button variant="outline" className="w-full">
                    <svg
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d='M20.839 10.38h-8.656v3.33h5.065c-.092.81-.645 2.07-1.842 2.88-.737.54-1.842.9-3.223.9-3.079 0-5.525-2.572-5.525-5.58 0-2.923 2.585-5.49 5.525-5.49 1.75 0 2.855.72 3.591 1.35l2.579-2.52C16.787 3.9 14.669 3 12.183 3 8.592 3 5.461 4.98 3.987 7.95a8.8 8.8 0 0 0 0 8.1C5.461 19.02 8.592 21 12.183 21c2.486 0 4.604-.81 6.078-2.16 2.4-2.1 3.095-5.427 2.578-8.46'/>
                    </svg>
                    Login with Google
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a className="underline underline-offset-4"
                   onClick={navigateToRegister}
                >
                    Sign up
                </a>
            </div>
        </form>
    );
}
