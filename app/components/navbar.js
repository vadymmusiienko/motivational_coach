"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { logout } from "../userAuth/actions";

// TODO: implement the isLoggedIn logic
export default function Navbar({ isLoggedIn }) {
    // States for responsiveness
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const showSidebar = () => setSidebarVisible(true);
    const hideSidebar = () => setSidebarVisible(false);

    return (
        <nav className="fixed w-full z-50 ">
            {/* Overlay for Mobile Sidebar */}
            {isSidebarVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={hideSidebar}
                    aria-hidden="true"
                ></div>
            )}

            {/* Vertical Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-black bg-opacity-50 backdrop-blur-lg shadow-lg transform ${
                    isSidebarVisible ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out z-50 md:hidden flex flex-col`}
            >
                {/* Sidebar Header */}
                <div className="flex justify-between items-center p-4">
                    <Link href="/">
                        <Image
                            src={"/logo.png"}
                            alt="Logo"
                            width={120}
                            height={60}
                            className="h-10 w-auto"
                        />
                    </Link>
                    <button onClick={hideSidebar} aria-label="Close Sidebar">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="26px"
                            viewBox="0 -960 960 960"
                            width="26px"
                            fill="#e8eaed"
                        >
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                    </button>
                </div>
                {/* Sidebar Links */}
                {isLoggedIn ? (
                    <ul className="flex flex-col space-y-8 p-4">
                        <li>
                            <Link
                                href="/dashboard"
                                className="text-white hover:underline"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/archive"
                                className="text-white hover:underline"
                            >
                                Archive
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className="text-white hover:underline"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => logout()}
                                className="relative text-white hover:underline"
                            >
                                Log Out
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className="flex flex-col space-y-8 p-4">
                        <li>
                            <Link
                                href="/userAuth/signin"
                                className="relative text-white hover:underline"
                            >
                                Log in
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/userAuth/register"
                                className="relative text-white hover:underline"
                            >
                                Sign up
                            </Link>
                        </li>
                    </ul>
                )}
            </div>

            {/* Horizontal Navbar */}
            <div
                className={`${
                    isSidebarVisible ? "hidden" : "flex"
                } items-center justify-between p-4 bg-black bg-opacity-50 backdrop-blur-lg rounded-lg m-4 md:flex shadow-glowbottom`}
            >
                {/* Logo */}
                <div>
                    <Link
                        href="/"
                        className="flex justify-center items-center space-x-6"
                    >
                        <Image
                            src={"/logo.png"}
                            alt="Logo"
                            width={120}
                            height={60}
                            className="h-10 w-auto"
                        />
                        <h1 className="text-xl font-semibold">
                            Motivational coach
                        </h1>
                    </Link>
                </div>

                {/* Navigation Links */}
                {isLoggedIn ? (
                    <ul className="hidden md:flex space-x-6">
                        <li>
                            <Link
                                href="/dashboard"
                                className="relative text-white hover:underline"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/archive"
                                className="relative text-white hover:underline"
                            >
                                Archive
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className="relative text-white hover:underline"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => logout()}
                                className="relative text-white hover:underline"
                            >
                                Log Out
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className="hidden md:flex space-x-6">
                        <li>
                            <Link
                                href="/userAuth/signin"
                                className="relative text-white hover:underline"
                            >
                                Log in
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/userAuth/register"
                                className="relative text-white hover:underline"
                            >
                                Sign up
                            </Link>
                        </li>
                    </ul>
                )}

                {/* Menu Button */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={showSidebar}
                    aria-label="Open Sidebar"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="26px"
                        viewBox="0 -960 960 960"
                        width="26px"
                        fill="#e8eaed"
                    >
                        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}
