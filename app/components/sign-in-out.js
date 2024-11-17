import { signOut } from "@/lib/auth";
import Link from "next/link";

// Just links
export function SignIn() {
    return <Link href="/userAuth/signin">Sign In</Link>;
}

// Just links
export function Register() {
    return <Link href="/userAuth/register">Register</Link>;
}

// Deletes current session
export function SignOut() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <button
                type="submit"
                className="relative text-white hover:underline"
            >
                Log Out
            </button>
        </form>
    );
}
