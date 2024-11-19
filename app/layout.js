import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";
import { auth } from "@/lib/auth";
import { CoachProvider } from "@/context/CoachContext";
import { LoadingProvider } from "@/context/Loading";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: "Motivational Coach",
    description:
        "Your personalized companion for staying motivated, providing uplifting quotes and tailored audio inspiration.",
};

export default async function RootLayout({ children }) {
    // Get the session and change the navbar according to whether user is authenticated or not
    const session = await auth();
    const isLoggedIn = !!session?.user;

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Navbar isLoggedIn={isLoggedIn} />
                <div className="pt-28"></div>
                <LoadingProvider>
                    <CoachProvider>{children}</CoachProvider>
                </LoadingProvider>
            </body>
        </html>
    );
}
