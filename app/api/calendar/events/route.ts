import { getUpcomingEvents } from '@/lib/api/calendar';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const events = await getUpcomingEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calendar events' },
      { status: 500 }
    );
  }
}
