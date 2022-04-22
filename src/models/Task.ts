export interface Task {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  complated: boolean;
  members: string[];
}
