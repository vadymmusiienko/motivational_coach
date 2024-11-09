import { auth } from "@/lib/auth";

export default async function ServerSessionTest() {
    const session = await auth();

    if (!session?.user) return null;

    return (
        <div>
            <h1>Server Session</h1>
            <div>{JSON.stringify(session)}</div>
        </div>
    );
}
