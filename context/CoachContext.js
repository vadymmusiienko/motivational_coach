"use client";
import { createContext, useContext, useState } from "react";

const CoachContext = createContext();

export function CoachProvider({ children }) {
    const [selectedCoach, selectCoach] = useState(
        process.env.NEXT_PUBLIC_VOICE_GOGGINS
    );
    return (
        <CoachContext.Provider value={{ selectedCoach, selectCoach }}>
            {children}
        </CoachContext.Provider>
    );
}

export function useCoach() {
    return useContext(CoachContext);
}
