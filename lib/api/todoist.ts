import { TodoistTask } from '@/types/todoist';

export async function getTasks(): Promise<TodoistTask[]> {
  const token = process.env.TODOIST_TOKEN;
  const projectId = process.env.TODOIST_PROJECT_ID;

  if (!token || !projectId) {
    throw new Error('Todoist credentials not configured');
  }

  const response = await fetch(
    `https://api.todoist.com/api/v1/tasks?project_id=${projectId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error(`Todoist API error: ${response.status}`);
  }

  return response.json();
}

export async function completeTask(taskId: string): Promise<void> {
  const token = process.env.TODOIST_TOKEN;

  if (!token) {
    throw new Error('Todoist token not configured');
  }

  const response = await fetch(
    `https://api.todoist.com/api/v1/tasks/${taskId}/complete`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to complete task: ${response.status}`);
  }
}
