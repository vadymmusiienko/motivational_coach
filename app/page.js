import ServerSessionTest from "./components/server-session-example";
import { SignIn, SignOut } from "./components/sign-in-out";

export default function Home() {
    return (
        <>
            <SignIn />
            <SignOut />
            <h2>Hello World</h2>
            <ServerSessionTest />
        </>
    );
}
