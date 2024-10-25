// components/General/Notification.js
import { useEffect, useState } from "react";

export default function Notification({ message, type = "success", duration = 3000, onClose }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);

            // Esconde a notificação após a duração especificada
            const timeout = setTimeout(() => {
                setShow(false);
                if (onClose) onClose();
            }, duration);

            // Limpa o timeout ao desmontar o componente
            return () => clearTimeout(timeout);
        }
    }, [message, duration, onClose]);

    if (!show) return null;

    return (
        <div
            className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg text-white text-sm ${type === "success" ? "bg-green-500" : "bg-red-500"
                } transition-all transform ${show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
            style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
        >
            {message}
        </div>
    );
}
