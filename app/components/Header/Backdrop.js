// components/Header/Backdrop.js
"use client";

import { motion, AnimatePresence } from "framer-motion";

// Variantes para o fade do backdrop
const backdropVariants = {
    visible: { opacity: 1, transition: { duration: 0.3 } },
    hidden: { opacity: 0, transition: { duration: 0.3 } },
};

export default function Backdrop({ isVisible, onClick }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-25 z-10"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClick}
                />
            )}
        </AnimatePresence>
    );
}
