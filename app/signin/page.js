import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";

export default async function SignInPage() {
    return (
        <div className="flex flex-col gap-2">
            <form
                action={async (formData) => {
                    "use server";
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
                }}
            >
                <label htmlFor="email">
                    Email
                    <input name="email" id="email" />
                </label>
                <label htmlFor="password">
                    Password
                    <input name="password" id="password" />
                </label>
                <input type="submit" value="Sign In" />
            </form>
        </div>
    );
}
