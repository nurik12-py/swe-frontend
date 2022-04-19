export interface Task {
  _id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  complated: boolean;
  members: string[];
}
