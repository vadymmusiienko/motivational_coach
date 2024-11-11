import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/dist/server/api-utils";

export default async function Dashboard() {
    const session = await auth();

    if (!session) {
        await signIn(); // This is how you protect a route
    }

    return <h1>Secret here</h1>;
}
