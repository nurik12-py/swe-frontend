import { TrashIcon } from "@heroicons/react/solid";
import * as React from "react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  endDate: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  description,
  endDate,
}) => {
  const getDate = (date: Date): string => {
    console.log(date);
    return `${date.toISOString().slice(0, 10)}`;
  };

  return (
    <Link
      to={`/projects/${id}`}
      className="col-span-12 rounded-xl border-2 border-slate-100 bg-slate-50 p-4 hover:bg-slate-100 md:col-span-3"
    >
      <h1 className="text-xl font-medium text-gray-700">{name}</h1>
      <p className="h-16 overflow-hidden truncate text-sm font-medium text-gray-500">
        {description}
      </p>

      <div className="mt-6 flex items-center justify-between text-sm font-medium text-gray-600">
        <p>Deadline: </p>
        <p>{getDate(new Date(endDate))}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
