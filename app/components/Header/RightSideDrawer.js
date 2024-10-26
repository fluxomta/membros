// components/Header/RightSideDrawer.js
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Avatar from "./Avatar";
import UserInfo from "./UserInfo";
import Link from "next/link";
import Icons from "@/components/General/Icons";

// Variantes para o drawer (abre da direita para a esquerda)
const drawerVariants = {
    open: {
        x: 0,
        transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
        x: "100%",
        transition: { type: "spring", stiffness: 300, damping: 30, delay: 0.8 },
    },
};

// Variantes para a lista com animação em cascata
const listVariants = {
    open: {
        transition: {
            staggerChildren: 0.10,
            delayChildren: 0.3,
        },
    },
    closed: {
        transition: {
            staggerChildren: 0.10,
            staggerDirection: -1,
        },
    },
};

// Variantes para cada item
const itemVariants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, x: 10, transition: { duration: 0.2 } },
};

const itemVariantsUser = {
    open: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.7, delay: .5 } },
    closed: { opacity: 1, y: -150, transition: { type: "spring", duration: 0.7, delay: .5 } },
};

export default function RightSideDrawer({ isOpen, onClose, user }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="bg-primary-700 text-white w-64 pt-16 shadow-lg z-10 fixed h-screen right-0 flex flex-col"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={drawerVariants}
                >
                    <div className="px-4 py-4">

                        <motion.div
                            className="flex items-center space-x-2 mb-4  bg-primary-500 p-2 rounded-md relative"
                            variants={itemVariantsUser}
                        >
                            <div className="absolute -right-0 -top-1 group">
                                <Icons.Badge width={20} height={20} />
                            </div>
                            <Avatar email={user.email} />
                            <UserInfo user={user} />
                        </motion.div>


                        <motion.ul
                            className="space-y-1 w-full"
                            variants={listVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <motion.li variants={itemVariants}>
                                <Link href="/favoritos" onClick={onClose} className="px-4 py-2 flex items-center hover:bg-primary-500 transition-all duration-300 rounded-md">
                                    Lista de Ativos
                                </Link>
                            </motion.li>
                            <motion.li variants={itemVariants}>
                                <Link href="/favoritos" onClick={onClose} className="px-4 py-2 flex items-center hover:bg-primary-500 transition-all duration-300 rounded-md">
                                    Meus Downloads
                                </Link>
                            </motion.li>
                            <motion.li variants={itemVariants}>
                                <Link href="/favoritos" onClick={onClose} className="px-4 py-2 flex items-center hover:bg-primary-500 transition-all duration-300 rounded-md">
                                    Meus Cursos
                                </Link>
                            </motion.li>
                            <motion.li variants={itemVariants}>
                                <Link href="/favoritos" onClick={onClose} className="px-4 py-2 flex items-center hover:bg-primary-500 transition-all duration-300 rounded-md">
                                    Mentoria
                                </Link>
                            </motion.li>
                            <motion.li className="py-0.5 rounded-md bg-white/10" variants={itemVariants}></motion.li>
                            <motion.li variants={itemVariants}>
                                <Link href="/favoritos" onClick={onClose} className="px-4 py-2 flex items-center hover:bg-primary-500 transition-all duration-300 rounded-md">
                                    Configurações
                                </Link>
                            </motion.li>
                            <motion.li variants={itemVariants}>
                                <Link href="/favoritos" onClick={onClose} className="px-4 py-2 flex items-center hover:bg-primary-500 transition-all duration-300 rounded-md">
                                    Ajuda
                                </Link>
                            </motion.li>
                            <motion.li variants={itemVariants}>
                                <button onClick={onClose} className="px-4 py-2 flex text-red-500 items-center hover:bg-primary-500 transition-all duration-300 rounded-md">
                                    Sair <Icons.Logout height={24} width={24} className="ml-2" />
                                </button>
                            </motion.li>
                        </motion.ul>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
