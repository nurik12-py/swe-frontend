import { useEffect, FC, useState } from "react";
import { useDecodedToken } from "../services/auth";
import { getAssignedTask } from "../services/tasks";
import { Task } from "../models/Task";
import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/TaskCard";

const Dashboard: FC = () => {
  const { _id } = useDecodedToken();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getAssignedTasksAsync = async () => {
      const res = await getAssignedTask(_id);
      setTasks(res.data);
    };
    getAssignedTasksAsync();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-medium">Tasks</h1>
      <div className="mt-4 grid grid-cols-12 gap-6">
        {tasks.map((task) => (
          <TaskCard
            complated={task.complated}
            name={task.name}
            description={task.description}
            endDate={task.endDate}
            id={task._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
