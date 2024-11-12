"use server";

import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signInSchema } from "@/lib/zod";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";

// Handle the Login
export async function login(formData) {
    // Extract form data
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        await signIn("credentials", {
            redirect: false,
            callbackUrl: "/",
            email,
            password,
        });
    } catch (error) {
        console.log("This error ", error);
        redirect(
            `/userAuth/signin?error=${encodeURIComponent(
                "Invalid password or email"
            )}`
        );
    }
    redirect("/dashboard");
}

// Handle the Register
export async function register(formData) {
    const firstName = formData.get("firstname").trim();
    const lastName = formData.get("lastname").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const confirmPassowrd = formData.get("confirmPassword").trim();

    // Make sure all field are filled
    if (!firstName || !lastName || !email || !password || !confirmPassowrd) {
        // Display the error message
        redirect(
            `/userAuth/register?error=${encodeURIComponent(
                "Please fill in all fields."
            )}`
        );
    }

    // Make sure its valid password and email
    try {
        await signInSchema.parseAsync({ email, password });
    } catch (e) {
        // Display the error message
        redirect(
            `/userAuth/register?error=${encodeURIComponent(
                "Invalid password or email format."
            )}`
        );
    }

    // Make sure the email is not used
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (existingUser) {
        // Display the error message
        redirect(
            `/userAuth/register?error=${encodeURIComponent(
                "The user already exists!"
            )}`
        );
    }

    if (existingUser) {
        throw new Error("The user already exists!");
    }

    // Hash the password
    const hashedPassword = await hash(password, 12);

    // Create a user
    await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
        },
    });

    // Log the user in (create a session)
    await signIn("credentials", {
        redirect: false,
        callbackurl: "/",
        email,
        password,
    });

    // Redirect back to dashboard
    redirect("/dashboard");
}
