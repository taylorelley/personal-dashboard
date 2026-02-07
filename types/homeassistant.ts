export interface Camera {
  name: string;
  entityId: string;
  online: boolean;
}

export interface AlarmStatus {
  state: string;
  name: string;
}

export interface HomeAssistantStatus {
  cameras: Camera[];
  alarm: AlarmStatus;
}
