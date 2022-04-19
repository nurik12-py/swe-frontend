import * as React from "react";
import { Link } from "react-router-dom";

interface UserCardProps {
  id: string;
  fullname?: string;
  role?: string;
  avatar?: string;
  Icon?: React.ReactNode;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  fullname,
  avatar,
  role,
  Icon,
}) => {
  return (
    <Link className="h-auto w-full" to={`/team-members/${id}`}>
      <div className="flex h-full w-full flex-col items-center justify-center text-center">
        {avatar ? (
          <img
            src={avatar}
            className="h-full w-full rounded-full border-2 border-slate-300 object-cover"
            alt=""
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-slate-300">
            {Icon}
          </div>
        )}
        <div className="mt-2 text-sm md:mt-4 md:text-xs">
          <span className="block  h-5 truncate font-medium text-black">
            {fullname}
          </span>
          <span className="block  h-4 capitalize text-indigo-600">{role}</span>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
