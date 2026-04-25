import { User } from "@/hooks/auth/types";
import Image from "next/image";

interface UserAvatarProps {
  user: User | null;
  onClick: () => void;
}

export const UserAvatar = ({ user, onClick }: UserAvatarProps) => {
  const displayName = user?.displayName || "";
  
  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      aria-label="User settings"
    >
      {user?.photoURL ? (
        <Image
          src={user.photoURL}
          alt={displayName}
          width={40}
          height={40}
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full bg-green-600 flex items-center justify-center">
          <span className="text-white font-semibold text-sm uppercase">
            {displayName.slice(0, 2)}
          </span>
        </div>
      )}
    </button>
  );
};
