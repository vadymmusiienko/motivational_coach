import { signIn, signOut } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export function SignIn() {
    return <Link href="/userAuth/signin">Sign In</Link>;
}

export function Register() {
    return <Link href="/userAuth/register">Register</Link>;
}

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <button type="submit">Sign Out</button>
        </form>
    );
}
