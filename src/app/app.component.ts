import { Component, OnInit, ViewChild } from "@angular/core";
import { webSocket } from "rxjs/webSocket";
import { Session } from "./models/session";
import { Pool } from "./models/pool";
import { poolList } from "./pool-data";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  poolMap = new Map<string, Pool>();
  poolList: Pool[] = poolList;

  constructor() {
    this.poolList.forEach((pool) => {
      this.poolMap.set(pool.websocket_url, pool);
    });
  }

  ngOnInit() {
    this.poolList.forEach((pool) => {
      const ws = webSocket<Session[]>(pool.websocket_url);
      ws.subscribe((data) => {
        // @ts-ignore
        const actualData = this.poolMap.get(ws._config.url);
        actualData.sessions = data as Session[];
        // @ts-ignore
        this.poolMap.set(ws._config.url, actualData);
        // @ts-ignore
        this.formatData(ws._config.url);
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
