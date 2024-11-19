"use client";

import { useCoach } from "@/context/CoachContext";
import { useLoading } from "@/context/Loading";
import { generateSpeech } from "@/lib/lmnt";

export default function PlayableQuotes({ quotes, hasQuotes }) {
    // Function to capitalize only the first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Loading states
    const { isLoading, setIsLoading } = useLoading();

    // Get the coach voiceId
    const { selectedCoach } = useCoach();

    // Play the audio from a card
    async function playAudio(content) {
        // If isLoading - return
        if (isLoading) return;

        // Start Loading
        setIsLoading(true);

        // Get the audio
        const audioBlob = await generateSpeech(content, selectedCoach);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        // Set isLoading to false when audio ends
        audio.addEventListener("ended", () => {
            setIsLoading(false);
        });

        // Play the audio
        audio.play();
    }

    return (
        <div className="grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {hasQuotes ? (
                quotes.map((quote, i) => (
                    <div
                        onClick={() => playAudio(quote.content)}
                        key={i}
                        className={`row-span-1 rounded-xl group/bento hover:shadow-glowbottom transition duration-200 shadow-none p-4 bg-black border-white/[0.2] border  justify-between flex flex-col space-y-4 ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {/* Quote header */}
                        <div className="group-hover/bento:translate-x-2 transition duration-200">
                            <div className="font-sans font-bold text-neutral-200 mb-2 mt-2">
                                {capitalizeFirstLetter(quote.topic)}
                            </div>
                            <div className="font-sans font-normal text-xs text-neutral-300">
                                {quote.content}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>There are no quotes here yet</p>
            )}
        </div>
    );
}
