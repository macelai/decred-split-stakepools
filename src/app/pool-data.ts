import { Pool } from "./models/pool";

const decredVoting = {
  name: "Decred Voting",
  url: "https://decredvoting.com/",
  websocket_url: "wss://matcher.decredvoting.com:8477/watchWaitingList",
  session_name: "decredvoting1",
  fee: 1,
  sessions: [],
} as Pool;

const nineNineSplit = {
  name: "99split",
  url: "https://99split.com",
  websocket_url: "wss://split.99split.com:8477/watchWaitingList",
  session_name: "99split",
  fee: 0.99,
  sessions: [],
} as Pool;

const decredBrasil = {
  name: "Decred Brasil",
  url: "https://stake.decredbrasil.com/",
  websocket_url:
    "wss://split-ticket-svc.stake.decredbrasil.com:8477/watchWaitingList",
  session_name: "dcrbr1",
  fee: 1,
  sessions: [],
} as Pool;

export const poolList = [decredVoting, nineNineSplit, decredBrasil];
