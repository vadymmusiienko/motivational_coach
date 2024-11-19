import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Quote from "./components/quote"; // Assuming this component is used elsewhere
import prisma from "@/lib/prisma";

export default async function Quotes() {
    // Redirect to the login page if not signed in
    const session = await auth();

    if (!session?.user) {
        const errorMessage = encodeURIComponent(
            "Log in to see the previous quotes"
        );
        redirect(`/userAuth/signin?error=${errorMessage}`);
    }

    return <Quote />;
}
