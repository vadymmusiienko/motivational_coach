import { getUserId } from "@/lib/lmnt";
import PlayableQuotes from "./playablequote";
import prisma from "@/lib/prisma";

export default async function QuoteGrid() {
    // Get user's id
    const userId = await getUserId();

    // Get all quotes
    let quotes = [];
    if (userId) {
        quotes = await prisma.quote.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 9,
        });
    }

    const hasQuotes = quotes.length > 0;
    return <PlayableQuotes quotes={quotes} hasQuotes={hasQuotes} />;
}
