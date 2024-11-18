import { auth } from "@/lib/auth";
import MainGrid from "./dashboard/components/main-grid";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
    const session = await auth();
    if (!!session?.user) {
        redirect("/dashboard");
    }

    return (
        <>
            <MainGrid />
            <div className="flex justify-items-center justify-center w-full p-4">
                <Link
                    href="/userAuth/signin"
                    className="text-center text-lg font-semibold text-gray-700"
                >
                    Sign up now to unlock access to all your motivational quotes
                    and stay inspired every day!
                </Link>
            </div>
        </>
    );
}
