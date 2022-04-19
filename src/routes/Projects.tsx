import { PlusSmIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { Spinner } from "../components/Spinner";
import { Project } from "../models/Project";
import { getProjects } from "../services/projects";

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[] | undefined>();

  useEffect(() => {
    const getProjectsAsync = async () => {
      const res = await getProjects();
      setProjects(res.data);
    };
    getProjectsAsync();
  }, []);

  return !projects ? (
    <Spinner />
  ) : (
    <div className="grid grid-cols-12 gap-4">
      <Link
        to={`/projects/new`}
        className="col-span-12 flex items-center justify-center rounded-xl border-2 border-slate-100 bg-slate-50 p-4 hover:bg-slate-100 md:col-span-3"
      >
        <div className="flex flex-col items-center justify-center ">
          <PlusSmIcon className="h-10 w-10" />
          <p className="font-medium text-gray-600">Add a new project</p>
        </div>
      </Link>
      {projects.map((project) => (
        <ProjectCard
          id={project._id}
          name={project.name}
          endDate={project.endDate}
          description={project.description}
        />
      ))}
    </div>
  );
};

export default Projects;
