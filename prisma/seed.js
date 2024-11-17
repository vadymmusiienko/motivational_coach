// seed.js
import { PrismaClient } from "@prisma/client";
//import { hash } from "bcryptjs";
import bcryptjs from "bcryptjs";

const hash = bcryptjs.hash;

const prisma = new PrismaClient();

async function main() {
    // Create a hashed password
    const password = await hash("test", 12);

    // Create David Goggins as a coach
    const davidGoggins = await prisma.coach.upsert({
        where: { voiceId: process.env.VOICE_GOGGINS },
        update: {},
        create: {
            voiceId: process.env.VOICE_GOGGINS,
            name: "David Goggins",
        },
    });

    console.log(`Created default coach: ${davidGoggins.name}`);

    // Create Elon Musk as a coach
    const elonMusk = await prisma.coach.upsert({
        where: { voiceId: process.env.VOICE_MUSK },
        update: {},
        create: {
            voiceId: process.env.VOICE_MUSK,
            name: "Elon Musk",
        },
    });

    console.log(`Created coach ${elonMusk.name}`);

    //TODO: add Tony Robbins as a coach

    // Create admin user
    const admin = await prisma.user.upsert({
        where: { email: "admin@gmail.com" },
        update: {},
        create: {
            firstName: "ADMIN",
            lastName: "ADMIN",
            email: "admin@gmail.com",
            password: password, // Hashed password
            coachVoiceId: process.env.VOICE_GOGGINS,
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
