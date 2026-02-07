import { HomeAssistantStatus } from '@/types/homeassistant';

export async function getHomeAssistantStatus(): Promise<HomeAssistantStatus> {
  const token = process.env.HOMEASSISTANT_TOKEN;
  const baseUrl = process.env.HOMEASSISTANT_URL || 'http://192.168.100.5:8123';

  if (!token) {
    throw new Error('Home Assistant token not configured');
  }

  const response = await fetch(
    `${baseUrl}/api/states`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 30 },
    }
  );

  if (!response.ok) {
    throw new Error(`Home Assistant API error: ${response.status}`);
  }

  const allEntities = await response.json();
  
  // Filter cameras
  const cameras = allEntities
    .filter((e: any) => e.entity_id.startsWith('camera.'))
    .map((e: any) => ({
      name: e.attributes.friendly_name || e.entity_id,
      entityId: e.entity_id,
      online: e.state !== 'unavailable' && e.state !== 'unknown',
    }));
  
  // Get alarm status
  const alarm = allEntities.find((e: any) => e.entity_id.startsWith('alarm_control_panel.'));
  
  return {
    cameras,
    alarm: {
      state: alarm?.state || 'unknown',
      name: alarm?.attributes.friendly_name || 'Alarm',
    },
  };
}
