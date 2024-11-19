import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
// Import the dashboard component
import MainGrid from "./components/main-grid";

export default async function Dashboard() {
    // Redirect to the home page if not signed in
    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }

    // Display the Dashboard
    return <MainGrid />;
}
