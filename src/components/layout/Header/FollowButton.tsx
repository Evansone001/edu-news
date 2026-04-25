import { FiCheck as CheckIcon, FiPlus as PlusIcon } from 'react-icons/fi';

interface FollowButtonProps {
  isFollowing: boolean;
  onClick: () => void;
  className?: string;
  variant?: 'default' | 'mobile';
}

export function FollowButton({ 
  isFollowing, 
  onClick, 
  className = '',
  variant = 'default'
}: FollowButtonProps) {
  if (variant === 'mobile') {
    return (
      <button
        onClick={onClick}
        className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold ${
          isFollowing
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 ring-1 ring-green-200 hover:bg-green-100'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:from-blue-700 hover:to-indigo-700'
        } transition-all duration-200 ${className}`}
      >
        {isFollowing ? (
          <>
            <CheckIcon className="h-4 w-4" />
            Following
          </>
        ) : (
          <>
            <PlusIcon className="h-4 w-4" />
            Follow Blog
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition-all duration-200 ${
        isFollowing
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 ring-1 ring-green-200 hover:bg-green-100 hover:shadow'
          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-md'
      } ${className}`}
    >
      {isFollowing ? (
        <>
          <CheckIcon className="h-4 w-4" />
          Following
        </>
      ) : (
        <>
          <PlusIcon className="h-4 w-4" />
          Follow
        </>
      )}
    </button>
  );
}