import ServerSessionTest from "./components/server-session-example";
import { SignIn, SignOut, Register } from "./components/sign-in-out";

export default function Home() {
    return (
        <>
            <SignIn />
            <SignOut />
            <Register />
            <h2>Hello World</h2>
            <ServerSessionTest />
        </>
    );
}
