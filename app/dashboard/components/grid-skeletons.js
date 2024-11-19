"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMotivated, randomQuoteAudio, setCoach } from "@/lib/lmnt";
import { useCoach } from "@/context/CoachContext";
import { useLoading } from "@/context/Loading";

// Constants with coach voice ids
const elonMusk = process.env.NEXT_PUBLIC_VOICE_MUSK;
const davidGoggins = process.env.NEXT_PUBLIC_VOICE_GOGGINS;
const tonyRobbins = process.env.NEXT_PUBLIC_VOICE_ROBBINS;

export const SkeletonOne = () => {
    // Get the coach
    const { selectedCoach } = useCoach();
    const { isLoading, setIsLoading } = useLoading();

    // Function that creates and says the custom quote
    async function handleSubmit(formData) {
        // If loading - return
        if (isLoading) return;

        // Start loading
        setIsLoading(true);

        // Get the topic
        const topic = formData.get("topic");
        if (!topic) {
            setIsLoading(false);
            return;
        }

        // Create a custom quote
        const audioBlob = await getMotivated(topic, selectedCoach);
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
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-white/[0.2] flex-col space-y-2"
        >
            <form
                action={handleSubmit}
                className="flex flex-col space-y-4 h-full"
            >
                <textarea
                    placeholder="What do you want to be motivated about?"
                    className={`w-full h-full p-4 rounded-lg bg-black border border-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    name="topic"
                    required
                    disabled={isLoading} // Disables the textarea
                />
                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isLoading} // Disables the button
                >
                    Get motivated!
                </button>
            </form>
        </motion.div>
    );
};
export const SkeletonTwo = () => {
    const variants = {
        initial: {
            width: 0,
        },
        animate: {
            width: "100%",
            transition: {
                duration: 0.2,
            },
        },
        hover: {
            width: ["0%", "100%"],
            transition: {
                duration: 2,
            },
        },
    };

    // Initialize state to store random widths
    const [maxWidths, setMaxWidths] = useState([]);

    // Generate random widths on component mount
    useEffect(() => {
        const widths = new Array(6)
            .fill(0)
            .map(() => `${Math.random() * (100 - 40) + 40}%`);
        setMaxWidths(widths);
    }, []);

    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-white/[0.2] flex-col space-y-2"
        >
            {maxWidths.map((width, i) => (
                <motion.div
                    key={"skelenton-two" + i}
                    variants={variants}
                    style={{
                        maxWidth: width,
                    }}
                    className="flex flex-row rounded-full border border-white/[0.2] p-2  items-center space-x-2 bg-black w-full h-4"
                ></motion.div>
            ))}
        </motion.div>
    );
};
export const SkeletonThree = () => {
    const variants = {
        initial: {
            backgroundPosition: "0 50%",
        },
        animate: {
            backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
        },
    };

    // Function to play a random motivational quote
    async function playAudio(selectedCoach) {
        if (isLoading) return;

        setIsLoading(true);
        // Retrieve and play the audio
        const audioBlob = await randomQuoteAudio(selectedCoach);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        // Set isLoading to false when audio ends
        audio.addEventListener("ended", () => {
            setIsLoading(false);
        });

        // Play the audio
        audio.play();
    }

    // Get current coach
    const { selectedCoach } = useCoach();
    const { isLoading, setIsLoading } = useLoading();

    return (
        <motion.div
            onClick={() => playAudio(selectedCoach)}
            initial="initial"
            animate="animate"
            variants={variants}
            transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
            }}
            className={`flex flex-1 w-full h-full min-h-[6rem] bg-dot-white/[0.2] rounded-lg flex-col space-y-2 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{
                background:
                    "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
                backgroundSize: "400% 400%",
            }}
        >
            <motion.div className="h-full w-full rounded-lg"></motion.div>
        </motion.div>
    );
};
export const SkeletonFour = () => {
    // States for highlighting the selected coach
    const { selectedCoach, selectCoach } = useCoach();
    const { isLoading } = useLoading();

    // Change the selected coach
    async function handleSelectCoach(voiceId) {
        // Check if already selected
        if (selectedCoach === voiceId) return;

        // Check if loading
        if (isLoading) return;

        // Update the state of the selected coach
        selectCoach(voiceId);
    }

    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className={`flex flex-1 w-full h-full min-h-[6rem] bg-dot-white/[0.2] flex-row space-x-2 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
            {/* Elon Musk */}
            <motion.div
                onClick={() => handleSelectCoach(elonMusk)}
                className={`relative h-full w-1/3 rounded-2xl p-4 bg-black border-white/[0.1] border flex flex-col items-center justify-center cursor-pointer ${
                    selectedCoach === elonMusk ? "shadow-glowbottom" : ""
                }`}
            >
                <Image
                    src="/musk.png"
                    alt="avatar"
                    height="100"
                    width="100"
                    className="rounded-full h-15 w-15"
                />
                <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                    Elon Musk
                </p>
                <p className="border border-red-500 bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Visionary
                </p>
            </motion.div>
            {/* David Goggins */}
            <motion.div
                onClick={() => handleSelectCoach(davidGoggins)}
                className={`relative h-full w-1/3 rounded-2xl p-4 bg-black border-white/[0.1] border flex flex-col items-center justify-center cursor-pointer ${
                    selectedCoach === davidGoggins ? "shadow-glowbottom" : ""
                }`}
            >
                <Image
                    src="/goggins.png"
                    alt="avatar"
                    height="100"
                    width="100"
                    className="rounded-full h-15 w-15"
                />
                <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                    David Goggins
                </p>
                <p className="border border-green-500 bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Unbreakable
                </p>
            </motion.div>
            {/* Tony Robbins */}
            <motion.div
                onClick={() => handleSelectCoach(tonyRobbins)}
                className={`relative h-full w-1/3 rounded-2xl p-4 bg-black border-white/[0.1] border flex flex-col items-center justify-center cursor-pointer ${
                    selectedCoach === tonyRobbins ? "shadow-glowbottom" : ""
                }`}
            >
                <Image
                    src="/robbins.png"
                    alt="avatar"
                    height="100"
                    width="100"
                    className="rounded-full h-15 w-15"
                />
                <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                    Tony Robbins
                </p>
                <p className="border border-orange-500 bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Empowering
                </p>
            </motion.div>
        </motion.div>
    );
};
