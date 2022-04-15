import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, Point, registerables } from "chart.js";
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
  private data: Point[] = [];

  @Input()
  inputs!: Array<any>

  constructor(private ws: WsService) {

  }

  transformData() {
    if (this.inputs) {
      this.inputs.forEach(i => {
        i.date = i.date.replace(/\//g, '-')
        this.data.push({ x: i.date, y: i.somme })
      })
    }

  }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges) {
    this.data = []
    console.log(changes['inputs'].currentValue)
    if (changes['inputs'].currentValue) {
      this.inputs = changes['inputs'].currentValue
      this.transformData()
      if (this.chart) {
        this.chart.destroy()
      }
      this.initializeChart()
    }

  }
  ngAfterViewInit(): void {
  }
  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  generateColor() {
    let color: any = []
    for (var i = 0; i < 10; i++) {
      let r = this.random(1, 255)
      let g = this.random(1, 255)
      let b = this.random(1, 255)
      color[i] = `rgba(${r},${g},${b},0.50)`
    }
    return color;
  }
  initializeChart() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Benefice',
          data: this.data,
          backgroundColor: this.generateColor()
        }]
      },
      options: {
        scales: {
          xAxis: {
            // The axis for this scale is determined from the first letter of the id as `'x'`
            // It is recommended to specify `position` and / or `axis` explicitly.
            type: 'category',
          }
        }
      }
    });

  }

}
