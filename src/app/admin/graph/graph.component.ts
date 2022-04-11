import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Chart, Point,registerables} from "chart.js";
import { WsService } from 'src/app/services/ws.service';
Chart.register(...registerables);
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

export class GraphComponent implements OnInit {
  @ViewChild('chart')
  private chartRef!: ElementRef;
  private chart!: Chart;
  private data: Point[];

  constructor(private ws:WsService) {
    this.data = [{x: 1, y: 5}, {x: 2, y: 10}, {x: 3, y: 6}, {x: 4, y: 2}, {x: 4.1, y: 6}];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Interesting Data',
          data: this.data,
          fill: false
        }]
      },
      options: {
        scales: {
          xAxis: {
            // The axis for this scale is determined from the first letter of the id as `'x'`
            // It is recommended to specify `position` and / or `axis` explicitly.
            type: 'linear',
          }
        }
      }
    });
  }

}
