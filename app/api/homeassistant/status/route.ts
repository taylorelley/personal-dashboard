import { getHomeAssistantStatus } from '@/lib/api/homeassistant';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const status = await getHomeAssistantStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error('Error fetching Home Assistant status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Home Assistant status' },
      { status: 500 }
    );
  }
}
