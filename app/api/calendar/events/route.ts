import { getUpcomingEvents } from '@/lib/api/calendar-improved';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const events = await getUpcomingEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    // Return empty array instead of error object to avoid client-side crashes
    return NextResponse.json([]);
  }
}
