import React from "react";
import { motion } from "framer-motion";

const animations = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: window.innerWidth },
    transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
    }
}

export function Animated({ children }) {
    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition="transition"
        >
            { children }
        </motion.div>
    );
}