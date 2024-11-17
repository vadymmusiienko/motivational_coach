import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Input from "../components/input";
import { Label } from "../components/label";
import { login } from "../actions";
import Link from "next/link";

export default async function Login({ searchParams }) {
    // The error message if any
    const { error } = await searchParams;
    const errorMessage = error ? decodeURIComponent(error) : null;

    // Only unauthorized users can log in
    const session = await auth();
    if (session?.user) redirect("/dashboard");

    return (
        <div className="flex items-center justify-center h-full">
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
                <h2 className="font-bold text-xl text-neutral-200">
                    Welcome Back to Motivational Coach!
                </h2>
                <p className="text-sm max-w-sm mt-2 text-neutral-300">
                    Log in to access your personalized tools and progress.
                </p>

                <form className="my-8" action={login}>
                    <div className="mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                placeholder="projectmayhem@fc.com"
                                type="email"
                                name="email"
                            />
                        </LabelInputContainer>
                    </div>
                    <div className="mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                placeholder="••••••••"
                                type="password"
                                name="password"
                            />
                        </LabelInputContainer>
                    </div>

                    <button
                        className="mt-8 bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        Sign in &rarr;
                        <BottomGradient />
                    </button>
                    <p className="mt-7 text-sm text-gray-400">
                        Don&apos;t have an accout yet? <br></br>
                        <Link
                            href="/userAuth/register"
                            className="text-blue-300 hover:underline font-medium transition duration-300"
                        >
                            Register here
                        </Link>
                    </p>
                    <p className="text-red-500 mt-4 text-center">
                        {errorMessage}
                    </p>
                </form>
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({ children }) => {
    return <div className={"flex flex-col space-y-2 w-full"}>{children}</div>;
};
