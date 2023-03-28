export type TodoData = {
  _id?: number;
  task: string;
  priority: string;
  dueDate: Date | string;
  done: boolean;
};

export type todoFields = { 
  task?: string;
  priority?: string;
  dueDate?: string;
  done?: boolean;
}