"use server";
import { OpenAI } from "openai";
import { auth } from "./auth";
import prisma from "./prisma";

// Function to generate a quote (returns a String)
export async function generateQuote(coachName, prompt) {
    // Prompts
    const SYSTEM_PROMPT = `Your name is ${coachName}, and you are a motivational coach.
     You don't say more than 4 senteces`;

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

    //return response;

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

// Takes voiceid as a parameter and sets it as coach for current user
export async function setCoach(voiceId) {
    // Get user's id
    const userId = await getUserId();
    if (!userId) return;

    // Update user's coach
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            coachVoiceId: voiceId,
        },
    });
}

// Returns an object with current user's coach (coachName, voiceId)
export async function getCoach() {
    // Get user's id
    const userId = await getUserId();
    if (!userId) return null;

    // Fetch user from the database and get coaches VoiceId
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    const voiceId = user.coachVoiceId;

    // Get the coach object
    const coach = await prisma.coach.findUnique({
        where: {
            voiceId: voiceId,
        },
    });

    // Return an object with coach voice and name
    return coach;
}

// Create an audio of a random quote
export async function randomQuoteAudio() {
    // Get coaches name and voice
    const { coachName, voiceId } = await getCoach();

    //TODO: come up with a prompt for a random quote
    const prompt = "Motivate me, by giving me a good quote!"; // Can create an array of prompts perhaps

    const quote = await generateQuote(coachName, prompt);
    const audio = await generateSpeech(quote, voiceId);

    return audio;
}
