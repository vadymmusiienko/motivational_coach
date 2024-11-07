// seed.js
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // Create a hashed password
    const password = await hash("test", 12);

    // Seed User data
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "johndoe@example.com",
            password: password, // Remember to hash this in production
        },
    });

    console.log(`Created user: ${user.email}`);

    // Seed Session data
    const session = await prisma.session.create({
        data: {
            sessionToken: "random_session_token",
            userId: user.id,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        },
    });

    console.log(`Created session for user: ${user.email}`);

    // Seed VerificationToken data
    const verificationToken = await prisma.verificationToken.create({
        data: {
            identifier: "johndoe@example.com",
            token: "random_verification_token",
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
        },
    });

    console.log(
        `Created verification token for user: ${verificationToken.identifier}`
    );
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
