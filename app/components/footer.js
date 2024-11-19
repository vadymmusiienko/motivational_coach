import Link from "next/link";

// components/Footer.js
export default function Footer() {
    return (
        <footer className="mt-5 text-gray-400 text-center py-4 shadow-glowbottom">
            <p className="text-lg">
                Powered by{" "}
                <Link
                    href="https://www.lmnt.com/"
                    className="text-white hover:text-blue-300"
                >
                    LMNT
                </Link>{" "}
                speech
            </p>
            <p className="text-sm mt-2">
                Please contact Vadym Musiienko at{" "}
                <Link
                    href="mailto:musiienkovadym@gmail.com"
                    className="hover:text-blue-300"
                >
                    musiienkovadym@gmail.com
                </Link>{" "}
                with any feedback or questions.
            </p>
        </footer>
    );
}
