"use client";
// Has to be a client component because uses motion and whileHover
import { motion } from "framer-motion";
import Image from "next/image";
// For random width
import { useEffect, useState } from "react";
// Import the lmnt and ChatGPT functionalities
import { getCoach, randomQuoteAudio, setCoach } from "@/lib/lmnt";

// Constants with coach voice ids
const elonMusk = process.env.NEXT_PUBLIC_VOICE_MUSK;
const davidGoggins = process.env.NEXT_PUBLIC_VOICE_GOGGINS;
const tonyRobbins = process.env.NEXT_PUBLIC_VOICE_ROBBINS; //TODO: synthesize the voice

// Function to play a random motivational quote
async function playAudio() {
    // Retrieve and play the audio
    const audioBlob = await randomQuoteAudio();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
}

export const SkeletonOne = () => {
    const variants = {
        initial: {
            x: 0,
        },
        animate: {
            x: 10,
            rotate: 5,
            transition: {
                duration: 0.2,
            },
        },
    };
    const variantsSecond = {
        initial: {
            x: 0,
        },
        animate: {
            x: -10,
            rotate: -5,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
        >
            <motion.div
                variants={variants}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
            >
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
                <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
            >
                <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
            </motion.div>
            <motion.div
                variants={variants}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
            >
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
                <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
            </motion.div>
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
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
        >
            {maxWidths.map((width, i) => (
                <motion.div
                    key={"skelenton-two" + i}
                    variants={variants}
                    style={{
                        maxWidth: width,
                    }}
                    className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
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
    return (
        <motion.div
            onClick={playAudio} //TODO
            initial="initial"
            animate="animate"
            variants={variants}
            transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
            }}
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
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
export const SkeletonFour = ({ currentlySelectedCoach }) => {
    const first = {
        initial: {
            x: 20,
            rotate: -5,
        },
        hover: {
            x: 0,
            rotate: 0,
        },
    };
    const second = {
        initial: {
            x: -20,
            rotate: 5,
        },
        hover: {
            x: 0,
            rotate: 0,
        },
    };

    // States for highlighting the selected coach
    const [selectedCoach, selectCoach] = useState(currentlySelectedCoach);

    // Change the selected coach
    async function handleSelectCoach(voiceId) {
        //TODO: add loading state
        // Update the database (new coachVoiceId)
        await setCoach(voiceId);

        // Update the state of the selected coach
        selectCoach(voiceId);
    }

    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
        >
            {/* Elon Musk */}
            <motion.div
                variants={first}
                onClick={() => handleSelectCoach(elonMusk)}
                className={`h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center cursor-pointer ${
                    selectedCoach === elonMusk ? "ring-4 ring-blue-500" : ""
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
                <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Visionary
                </p>
            </motion.div>
            {/* David Goggins */}
            <motion.div
                onClick={() => handleSelectCoach(davidGoggins)}
                className={`h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center cursor-pointer ${
                    selectedCoach === davidGoggins ? "ring-4 ring-blue-500" : ""
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
                <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Unbreakable
                </p>
            </motion.div>
            {/* Tony Robbins */}
            <motion.div
                variants={second}
                onClick={() => handleSelectCoach(tonyRobbins)}
                className={`h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center cursor-pointer ${
                    selectedCoach === tonyRobbins ? "ring-4 ring-blue-500" : ""
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
                <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Empowering
                </p>
            </motion.div>
        </motion.div>
    );
};
