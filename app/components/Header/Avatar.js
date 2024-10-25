// components/Header/Avatar.js
import Gravatar from "@/components/profile/Gravatar";

export default function Avatar({ email }) {
    return (
        <div className="w-10 h-10 rounded-full overflow-hidden">
            <Gravatar email={email} size={40} />
        </div>
    );
}
