import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import Input from "./components/input";
import { Label } from "./components/label";

export default function SignUp() {
    // Handle the submission
    async function handleFormSubmit(formData) {
        "use server";
        console.log("this is formdata", formData); //TODO:

        // Extract form data
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            await signIn("credentials", {
                redirect: false,
                callbackUrl: "/",
                email,
                password,
            });
        } catch (error) {
            const someError = error;
            return someError.cause;
        }
        redirect("/dashboard");
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
                <h2 className="font-bold text-xl text-neutral-200">
                    Welcome to my website
                </h2>
                <p className="text-sm max-w-sm mt-2 text-neutral-300">
                    Login to aceternity if you can because we don&apos;t have a
                    login flow yet
                </p>

                <form className="my-8" action={handleFormSubmit}>
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
