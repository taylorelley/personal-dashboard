import { CalendarEvent } from '@/types/calendar';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function getAccessToken(): Promise<string> {
  const scriptPath = process.env.GCAL_REFRESH_SCRIPT || '~/.clawdbot/secrets/gcal_refresh.sh';
  
  try {
    const { stdout } = await execAsync(`bash ${scriptPath}`);
    return stdout.trim();
  } catch (error) {
    console.error('Error getting Google Calendar token:', error);
    throw new Error('Failed to get Google Calendar access token');
  }
}

export async function getUpcomingEvents(): Promise<CalendarEvent[]> {
  const token = await getAccessToken();
  
  const now = new Date().toISOString();
  const weekLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
    `timeMin=${now}&timeMax=${weekLater}&singleEvents=true&orderBy=startTime&maxResults=10`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      next: { revalidate: 300 },
    }
  );

  if (!response.ok) {
    throw new Error(`Google Calendar API error: ${response.status}`);
  }

  const data = await response.json();
  return data.items || [];
}
