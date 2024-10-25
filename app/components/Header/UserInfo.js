// components/Header/UserInfo.js
export default function UserInfo({ user }) {
    return (
        <div className="">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
        </div>
    );
}
