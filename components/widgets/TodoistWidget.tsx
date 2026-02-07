'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { TodoistTask } from '@/types/todoist';

interface TodoistWidgetProps {
  initialTasks: TodoistTask[];
}

export function TodoistWidget({ initialTasks }: TodoistWidgetProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/todoist/tasks');
        if (response.ok) {
          const updatedTasks = await response.json();
          setTasks(updatedTasks);
        }
      } catch (error) {
        console.error('Failed to refresh tasks:', error);
      }
    }, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval);
  }, []);

  async function handleCompleteTask(taskId: string) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/todoist/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId }),
      });

      if (response.ok) {
        setTasks(tasks.filter(t => t.id !== taskId));
      }
    } catch (error) {
      console.error('Failed to complete task:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const priorityColors = {
    4: 'text-red-600',
    3: 'text-orange-500',
    2: 'text-blue-500',
    1: 'text-gray-600',
  };

  return (
    <Card title="📝 Tasks" className="md:col-span-2">
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No tasks found</p>
        ) : (
          tasks.slice(0, 8).map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <input
                type="checkbox"
                onChange={() => handleCompleteTask(task.id)}
                disabled={isLoading}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1 min-w-0">
                <p className={`font-medium ${priorityColors[task.priority as keyof typeof priorityColors]} dark:text-gray-100`}>
                  {task.content}
                </p>
                {task.due && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Due: {task.due.string}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
