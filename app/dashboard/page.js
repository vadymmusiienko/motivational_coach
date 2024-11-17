import { auth, signIn } from "@/lib/auth";
// Import the dashboard component
import MainGrid from "./components/main-grid";

export default async function Dashboard() {
    // Protect the route
    const session = await auth();

    if (!session) {
        await signIn(); // This is how you protect a route
    }

    // Display the Dashboard
    return <MainGrid />;
}
//TODO:
// Modify grid-skeletons to change animation
// Modify items for description, titles and images
