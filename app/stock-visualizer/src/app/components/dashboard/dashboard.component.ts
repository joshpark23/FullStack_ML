import { Component, OnInit } from '@angular/core';
import * as FusionCharts from 'fusioncharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var chart = new FusionCharts({
      type: "column2d",
      renderAt: "chart-container", // container where chart will render
      width: "600",
      height: "400",
      dataFormat: "json",
      dataSource: {
          // chart configuration
          chart: {
              caption: "Countries With Most Oil Reserves [2017-18]",
              subcaption: "In MMbbl = One Million barrels"
          },
          // chart data
          data: [
              { label: "Venezuela", value: "290000" },
              { label: "Saudi", value: "260000" },
              { label: "Canada", value: "180000" },
              { label: "Iran", value: "140000" },
              { label: "Russia", value: "115000" },
              { label: "UAE", value: "100000" },
              { label: "US", value: "30000" },
              { label: "China", value: "30000" }
          ]
      }
    }).render();

  }

}
