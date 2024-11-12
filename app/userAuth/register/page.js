import Input from "../components/input";
import { Label } from "../components/label";
import Link from "next/link";
import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { signInSchema } from "@/lib/zod";
import { cookies } from "next/headers";

export default async function SignUp({ searchParams }) {
    // Only unauthorized users can register
    const session = await auth();
    if (session?.user) redirect("/dashboard");

    // Access the cookies
    const cookieStore = cookies();

    // Get the error message from the cookies
    const errorMessageCookie = cookieStore.get("errorMessage");
    const errorMessage = errorMessageCookie ? errorMessageCookie.value : null;


    // Handle the register
    async function handleSubmit(formData) {
        "use server";
        const cookieStore = cookies(); // Initialize the cookie store
        const firstName = formData.get("firstname").trim();
        const lastName = formData.get("lastname").trim();
        const email = formData.get("email").trim();
        const password = formData.get("password").trim();
        const confirmPassowrd = formData.get("confirmPassword").trim();

        // Make sure all field are filled
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassowrd
        ) {
            // Display the error message
            cookieStore.set("errorMessage", "Please fill in all fields.");
            redirect(`/userAuth/register`);
        }

        // Ensure passwords match
        if (password != confirmPassowrd) {
            cookieStore.set("errorMessage", "Passwords do not match.");
            redirect(`/userAuth/register`);
        }

        // Make sure its valid password and email
        try {
            await signInSchema.parseAsync({ email, password });
        } catch (e) {
            // Display the error message
            cookieStore.set(
                "errorMessage",
                "Invalid password or email format."
            );
            redirect(`/userAuth/register`);
        }

        // Make sure the email is not used
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            cookieStore.set("errorMessage", "The user already exists!");
            redirect(`/userAuth/register`);
        }

            // If everything is okay, clear any existing error message
    cookieStore.set("errorMessage", "", { maxAge: -1 });


        // Hash the password
        const hashedPassword = await hash(password, 12);

        // Create a user
        await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
        });
        //TODO:
        console.log("User succefully created");

        // Log the user in (create a session)
        await signIn("credentials", {
            redirect: false,
            callbackurl: "/",
            email,
            password,
        });

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

                <form className="my-8" action={handleSubmit}>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="firstname">First name</Label>
                            <Input
                                id="firstname"
                                placeholder="First name"
                                type="text"
                                name="firstname"
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="lastname">Last name</Label>
                            <Input
                                id="lastname"
                                placeholder="Last name"
                                type="text"
                                name="lastname"
                            />
                        </LabelInputContainer>
                    </div>
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

                    <LabelInputContainer>
                        <Label htmlFor="confirmPassword">
                            Repeat your password
                        </Label>
                        <Input
                            id="confirmPassowrd"
                            placeholder="••••••••"
                            type="password"
                            name="confirmPassword"
                        />
                    </LabelInputContainer>

                    <button
                        className="mt-8 bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        Sign up &rarr;
                        <BottomGradient />
                    </button>

                    <button
                        className="mt-8 bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="button"
                    >
                        <Link href="/userAuth/signin">Login</Link>
                        <BottomGradient />
                    </button>
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
