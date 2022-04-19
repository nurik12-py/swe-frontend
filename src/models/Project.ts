import { Task } from "./Task";
import User from "./User";

export interface Project {
  _id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  complated: boolean;
  members: User[];
  tasks: Task[];
  createdBy: string;
}
