"use server";
import { OpenAI } from "openai";
import { auth } from "./auth";
import prisma from "./prisma";

// Function to generate a quote (returns a String)
export async function generateQuote(prompt) {
    // Prompts
    const SYSTEM_PROMPT =
        "You are a motivational coach and quote creator with a great sense of humor. Your purpose is to generate inspiring, uplifting, and funny motivational quotes based on the user's input. Keep the tone positive, encouraging, and light-hearted, blending humor with inspiration. Focus on making each quote impactful, concise, and relevant to the topic provided by the user, while adding a playful or witty twist. Don't use emoji.";

    // Initialize OpenAI object
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Use OpenAI's API to generate the quote
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: SYSTEM_PROMPT,
            },
            { role: "user", content: prompt },
        ],
    });

    // Get the text from ChatGPT's responce
    const quote = response.choices[0].message.content.trim();

    // Return the quote
    return quote;
}

// Function to synthesize speech (returns an audio object: HTMLAudioElement)
export async function generateSpeech(quote, voiceId) {
    //Api key
    const apiKey = process.env.LMNT_API_KEY;

    // Construct the URL with query parameters
    const url = new URL("https://api.lmnt.com/v1/ai/speech");
    url.searchParams.append("text", quote);
    url.searchParams.append("voice", voiceId);
    url.searchParams.append("format", "mp3");

    // Make the API request
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "X-API-Key": apiKey,
        },
        model: "blizzard",
    });

    // Assure the request was succesfull
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
            `LMNT api request error! Status: ${response.status}, ${errorText}`
        );
    }

    // Get the audio data from the responce as a blob and return it
    const audioBlob = await response.blob();

    return audioBlob;
}

export async function getUserId() {
    // Get user's id from their session
    const session = await auth();
    if (!session?.user) {
        return null; // Null means the user is not logged in
    }
    return session.user.id;
}

// Create an audio of a random quote
export async function randomQuoteAudio(voiceId) {
    const prompt =
        "Generate a random funny yet inspiring and motivational quote that uplifts the user's mood. The quote should be general, light-hearted, and encourage positivity and perseverance, with a touch of humor or wit to make the user smile. Avoid referencing specific topics or contexts so it can apply to anyone seeking motivation.";

    const quote = await generateQuote(prompt);
    const audio = await generateSpeech(quote, voiceId);

    return audio;
}

// Function to play a custom motivational quote
export async function getMotivated(topic, voiceId) {
    const prompt = `Create a funny yet inspiring and motivational quote based on the topic provided. The quote should be uplifting, encouraging, and related to the topic. Add a playful or witty twist to make it light-hearted and emotionally resonant for someone seeking motivation. The topic is: ${topic}.`;

    const quote = await generateQuote(prompt);
    const audio = await generateSpeech(quote, voiceId);

    // Get user's id (if any)
    const userId = await getUserId();
    if (!userId) return audio;

    // Create a quote in the database
    await prisma.quote.create({
        data: {
            content: quote,
            topic,
            userId,
        },
    });

    return audio;
}
