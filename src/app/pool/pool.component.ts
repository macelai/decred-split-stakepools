import { Component, Input } from "@angular/core";
import { Pool } from "../models/pool";

@Component({
  selector: "app-pool",
  templateUrl: "./pool.component.html",
  styleUrls: ["./pool.component.css"],
})
export class PoolComponent {
  @Input() pool: Pool = {} as Pool;

  constructor() {}
}
