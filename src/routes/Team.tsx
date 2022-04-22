import { PlusIcon } from "@heroicons/react/solid";
import { ChangeEvent, FC, useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { Spinner } from "../components/Spinner";
import UserCard from "../components/UserCard";
import User from "../models/User";
import { useDecodedToken } from "../services/auth";
import { getUsers } from "../services/user";

const Team: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>();
  const { admin } = useDecodedToken();

  useEffect(() => {
    const getUsersAsync = async () => {
      const res = await getUsers();
      const users = res.data as User[];
      setFiltered(users);
      setUsers(users);
    };

    getUsersAsync();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const usersCopy = [...users];
    const result = usersCopy.filter(
      (user) =>
        user.firstName.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
        user.lastName.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    console.log(result);
    setFiltered(result);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-center text-4xl font-medium text-gray-800 ">
          Team
        </h1>
        <p className="text-center text-lg font-normal text-gray-500">
          Find your team members
        </p>
      </div>
      <div className="mb-4 flex justify-center">
        <input
          onChange={handleSearch}
          type="text"
          name="name"
          id="name"
          className="block w-3/4 rounded-md border-gray-300 pl-3 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-1/3"
          placeholder="Search..."
        />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-10 md:m-10 md:grid-cols-6  md:gap-6 lg:grid-cols-8">
        {admin && (
          <UserCard
            id="new"
            fullname="Add a member"
            Icon={<PlusIcon className="h-6 w-6" />}
          />
        )}

        {!filtered ? (
          <Spinner />
        ) : (
          filtered.map((user) => (
            <UserCard
              key={user._id}
              id={user._id!}
              role={user.role}
              fullname={`${user.firstName} ${user.lastName}`}
              avatar={user.avatar}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Team;
