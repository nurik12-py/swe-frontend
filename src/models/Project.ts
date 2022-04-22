import { Task } from "./Task";
import User from "./User";

export interface Project {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  complated: boolean;
  members: User[];
  tasks: Task[];
  createdBy: string;
}
