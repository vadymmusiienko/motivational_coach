// seed.js
import { PrismaClient } from "@prisma/client";
//import { hash } from "bcryptjs";
import bcryptjs from "bcryptjs";

const hash = bcryptjs.hash;

const prisma = new PrismaClient();

async function main() {
    // Create a hashed password
    const password = await hash("test", 12);

    // Create admin user
    const admin = await prisma.user.upsert({
        where: { email: "admin@gmail.com" },
        update: {},
        create: {
            firstName: "ADMIN",
            lastName: "ADMIN",
            email: "admin@gmail.com",
            password: password, // Hashed password
        },
    });

    console.log(`Created user: ${admin.email}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
