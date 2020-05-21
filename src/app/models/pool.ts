import { Session } from "./session";

export interface Pool {
  name: string;
  url: string;
  websocket_url: string;
  session_name: string;
  fee: number;
  sessions: Session[];
}
