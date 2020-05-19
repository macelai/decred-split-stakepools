import { Component, OnInit, ViewChild } from "@angular/core";
import { webSocket } from "rxjs/webSocket";
import { PoolComponent } from "./pool/pool.component";

export interface Pool {
  sessions: Session[];
}

export interface Session {
  amounts: number[];
  total?: number;
  name: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "decred-stakepools";
  @ViewChild(PoolComponent, { static: true }) poolComponent: PoolComponent;

  decredVotingWS = webSocket<Session[]>(
    "wss://matcher.decredvoting.com:8477/watchWaitingList"
  );
  niniNineWS = webSocket<Session[]>(
    "wss://split.99split.com:8477/watchWaitingList"
  );
  decredBrasilWS = webSocket<Session[]>(
    "wss://split-ticket-svc.stake.decredbrasil.com:8477/watchWaitingList"
  );
  poolList = [this.decredVotingWS, this.niniNineWS];

  poolMap = new Map<string, Pool>();

  constructor() {}

  ngOnInit() {
    this.poolList.forEach((pool) => {
      pool.subscribe((data) => {
        const sessionData = data as Session[];
        const poolData = { sessions: sessionData } as Pool;
        // @ts-ignore
        this.poolMap.set(pool._config.url, poolData);
        // @ts-ignore
        this.formatData(pool._config.url);
      });
    });
  }

  private formatData(poolString: string) {
    const pool = this.poolMap.get(poolString);
    pool.sessions.forEach((ses) => {
      const total = ses.amounts.reduce((total, each) => total + each, 0);
      ses.amounts = ses.amounts.map((amount) =>
        Number((amount / 1e8).toFixed(2))
      );
      ses.total = total / 1e8;
    });
  }
}
