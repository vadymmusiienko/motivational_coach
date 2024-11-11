import { auth } from "@/lib/auth";

export default async function ServerSessionTest() {
    const session = await auth();

    if (!session?.user) return null;

    const user_id = session.user.id; // This is how you get a user id from session

    return (
        <>
            <h1>Server Session</h1>
            <div>{JSON.stringify(session)}</div>
            <div>{user_id}</div>
        </>
    );
}
