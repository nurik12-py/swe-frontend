import { PlusSmIcon } from "@heroicons/react/outline";
import { PlusIcon, TrashIcon } from "@heroicons/react/solid";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { Spinner } from "../components/Spinner";
import { Timeline } from "../components/Timeline";
import UserCard from "../components/UserCard";
import { Project } from "../models/Project";
import { Task } from "../models/Task";
import User from "../models/User";
import { deleteProject, getProject } from "../services/projects";

const ProjectInfo: FC = () => {
  const { id: projectId } = useParams();
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    const getProjectAsync = async () => {
      const res = await getProject(projectId as string);
      setProject(res.data);
    };
    getProjectAsync();
  }, []);

  const handleDelete = async () => {
    if (!window.confirm("Do you want to delete the project?")) return;
    console.log(project!._id);
    const res = await deleteProject(project!._id);
    window.location.href = "/projects";
  };

  return !project ? (
    <Spinner />
  ) : (
    <div>
      <div>
        <div className="flex items-center justify-between ">
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <p className="mt-1 text-base font-medium text-gray-500">
              {project.description}
            </p>
          </div>
          <button
            onClick={handleDelete}
            className="rounded-md border-2 border-gray-300 bg-white p-2 text-red-600 hover:bg-red-600 hover:text-white"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-left text-3xl font-bold">Members</h1>
        <div className="mt-6 grid grid-cols-4 gap-6 md:mt-2 md:grid-cols-6 lg:grid-cols-12">
          {project?.members.map((member: User) => (
            <UserCard id={member._id!} avatar={member.avatar} />
          ))}
        </div>
      </div>
      <div className="">
        <h1 className="text-left text-3xl font-bold">Tasks</h1>
        <div className="mt-4 grid grid-cols-12 gap-6">
          <Link
            to={`/projects/${projectId}/tasks/new`}
            className="col-span-12 flex items-center justify-center rounded-xl border-2 border-slate-100 bg-slate-50 p-4 hover:bg-slate-100 md:col-span-3"
          >
            <div className="flex flex-col items-center justify-center ">
              <PlusSmIcon className="h-10 w-10" />
              <p className="font-medium text-gray-600">Add a new task</p>
            </div>
          </Link>
          {project?.tasks.map((task: Task) => (
            <ProjectCard
              name={task.name}
              description={task.description}
              endDate={task.endDate}
              id="id/activities/activityId"
            />
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h1 className="mb-2 text-left text-3xl font-bold">Timeline</h1>
        <Timeline project={project} />
      </div>
    </div>
  );
};

export default ProjectInfo;
