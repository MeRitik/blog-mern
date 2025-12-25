import { useAuth } from "../context/AuthContext";

function UserInfo() {
    const { user } = useAuth();
    return (
        <div className="flex items-center space-x-4">
            <img
                src={user?.avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
            />
            <span className="text-foreground font-medium">{user?.username.split(' ').at(0)}</span>
        </div>
    )
}

export default UserInfo;