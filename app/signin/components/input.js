"use client";
/**
 * This component is an input field for a signup/signin form
 * It has Gradient effect and it takes id, placeholder and type as parameters
 */
import { useState, forwardRef } from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

const Input = forwardRef(({ type, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }
    return (
        <motion.div
            style={{
                background: useMotionTemplate`
      radial-gradient(
        ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
        var(--blue-500),
        transparent 80%
      )
    `,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="p-[2px] rounded-lg transition duration-300 group/input"
        >
            <input
                type={type}
                className={`flex h-10 w-full border-none bg-zinc-800 text-white rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent 
        file:text-sm file:font-medium placeholder-text-neutral-600 
        focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-600
         disabled:cursor-not-allowed disabled:opacity-50
         shadow-[0px_0px_1px_1px_var(--neutral-700)]
         group-hover/input:shadow-none transition duration-400
         `}
                ref={ref}
                {...props}
            />
        </motion.div>
    );
});
Input.displayName = "Input";

export default Input;
