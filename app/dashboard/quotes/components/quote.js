import { getUserId } from "@/lib/lmnt";
import PlayableQuotes from "./playablequote";

export default async function Quote() {
    // Get user's id
    const userId = await getUserId();

    // Get all quotes
    let quotes = [];
    if (userId) {
        quotes = await prisma.quote.findMany({
            where: {
                userId: userId,
            },
        });
    }

    const hasQuotes = quotes.length > 0;
    return <PlayableQuotes quotes={quotes} hasQuotes={hasQuotes} />;
}
