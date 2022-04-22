import { TrashIcon } from "@heroicons/react/solid";
import * as React from "react";
import { Link } from "react-router-dom";
import { changeTaskStatus } from "../services/tasks";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  complated: boolean;
  endDate: string;
}

const TaskCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  description,
  complated,
  endDate,
}) => {
  const [comp, setComp] = React.useState(complated);
  const [loading, setLoading] = React.useState(false);
  const handleChange = async () => {
    try {
      setLoading(true);
      const res = await changeTaskStatus(id, !comp);
      setComp(!comp);
      setLoading(false);
    } catch (err) {
      console.log("error");
      setLoading(false);
    }
  };

  const getDate = (date: Date): string => {
    return `${date.toISOString().slice(0, 10)}`;
  };

  return (
    <div className="col-span-12 rounded-xl border-2 border-slate-100 bg-slate-50 p-4 hover:bg-slate-100 md:col-span-3">
      <div className="flex items-center justify-between  ">
        <h1 className="text-xl font-medium text-gray-700">{name}</h1>
        <input
          onChange={handleChange}
          id="admin"
          name="admin"
          checked={comp}
          type="checkbox"
          disabled={loading}
          className={`${
            loading && "animate-pulse"
          } h-6 w-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500`}
        />
      </div>
      <p className="h-16 overflow-hidden truncate text-sm font-medium text-gray-500">
        {description}
      </p>

      <div className="mt-6 flex items-center justify-between text-sm font-medium text-gray-600">
        <p>Deadline: </p>
        <p>{getDate(new Date(endDate))}</p>
      </div>
    </div>
  );
};

export default TaskCard;
