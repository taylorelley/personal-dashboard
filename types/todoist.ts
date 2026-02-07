export interface TodoistTask {
  id: string;
  content: string;
  description: string;
  project_id: string;
  priority: number;
  due?: {
    date: string;
    string: string;
  };
  completed: boolean;
  created_at: string;
}
