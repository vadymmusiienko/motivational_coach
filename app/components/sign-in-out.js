import { signIn, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export function SignIn() {
    return (
        <form
            action={async () => {
                "use server";
                redirect("/signin");
            }}
        >
            <button type="submit">Sign in</button>
        </form>
    );
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
