import { Session } from "./session";

export interface Pool {
  name: string;
  url: string;
  fee: number;
  sessions: Session[];
}
