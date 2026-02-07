import { getTasks } from '@/lib/api/todoist';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const tasks = await getTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching Todoist tasks:', error);
    // Return empty array instead of error object to avoid client-side crashes
    return NextResponse.json([]);
  }
}
