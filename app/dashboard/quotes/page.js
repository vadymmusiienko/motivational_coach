import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Quotes() {
    // Redirect to the home page if not signed in
    const session = await auth();

    if (!session?.user) {
        const errorMessage = encodeURIComponent('Log in to see "My quotes"');
        redirect(`/userAuth/signin?error=${errorMessage}`);
    }
}
