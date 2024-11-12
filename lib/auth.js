import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/zod";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";

// Providers
const providers = [
    Credentials({
        name: "credentials",
        credentials: {
            email: {
                label: "Email",
                type: "email",
                placeholder: "hello@example.com",
            },
            password: {
                label: "password",
                type: "password",
                placeholder: "password",
            },
        },
        authorize: async (credentials) => {
            // Make sure user entered something
            console.log("Authorize called with credentials:", credentials); //TODO:
            if (!credentials?.email || !credentials.password) {
                console.log("Missing email or password."); // TODO
                return null;
            }

            try {
                // Uses Zod to make sure email and password are valid
                const { email, password } = await signInSchema.parseAsync(
                    credentials
                );
                console.log("Parsed credentials:", { email }); //TODO:

                // Get the user
                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });
                console.log("Fetched user:", user); //TODO

                // User not found
                if (!user) {
                    console.log("No user found with email:", email); //TODO:
                    return null;
                }

                // Check whether the password is valid
                const passwordIsValid = await compare(password, user.password);
                console.log("Password valid:", passwordIsValid); //TODO

                // The password is not correct
                if (!passwordIsValid) {
                    console.log("Invalid password for user:", email); //TODO
                    return null;
                }

                console.log("User authenticated:", email); //TODO
                // return JSON object with the user data
                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.name,
                };
            } catch (error) {
                if (error instanceof ZodError) {
                    console.log("Zod validation error:", error.errors); //TODO
                    // Failed Zod test (not valid password or email)
                    return null;
                }
            }
        },
    }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    adapter: PrismaAdapter(prisma),
    providers: providers,

    // Add callbacks here
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                // User is available during sign-in
                token.id = user.id;
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
    },
    // Add a custom log in page
    pages: {
        signIn: "/userAuth/signin",
    },
});
