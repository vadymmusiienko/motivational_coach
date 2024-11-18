"use server";
import { OpenAI } from "openai";
import { auth } from "./auth";
import prisma from "./prisma";

// Function to generate a quote (returns a String)
export async function generateQuote(prompt) {
    // Prompts
    const SYSTEM_PROMPT =
        "You are a motivational coach and quote creator. Your purpose is to generate inspiring, uplifting, and personalized motivational quotes based on the user's input. Keep the tone positive, encouraging, and emotionally resonant. Focus on making each quote impactful, concise, and relevant to the topic provided by the user.";

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
        "Generate a random inspiring and motivational quote that uplifts the user's mood. The quote should be general, emotionally resonant, and encourage positivity and perseverance. Avoid referencing specific topics or contexts so that it can apply to anyone seeking motivation.";

    const quote = await generateQuote(prompt);
    const audio = await generateSpeech(quote, voiceId);

    return audio;
}

// Function to play a custom motivational quote
export async function getMotivated(topic, voiceId) {
    const prompt = `Create an inspiring and motivational quote based on the topic provided. The quote should be uplifting, encouraging, and related to the topic. Ensure it feels personal and resonates emotionally with someone seeking motivation. The topic is: ${topic}.`;
    const quote = await generateQuote(prompt);
    const audio = await generateSpeech(quote, voiceId);

    // Get user's id (if any)
    const userId = await getUserId();
    if (!userId) return audio;

    console.log("Creating quote for userId:", userId);

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
