import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";
import { auth } from "@/lib/auth";

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
    title: "Create Next App",
    description: "Generated by create next app",
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
                <div className="pt-32"></div>
                {children}
            </body>
        </html>
    );
}
