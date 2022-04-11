import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  constructor() { }

  @Input()
  restaurant: any;

  @Output()
  showEvent = new EventEmitter<string>();
  evokeEvent() {
    this.showEvent.emit('show_menu');
  }

  rate = 4;
  myRate = 0;
  ngOnInit(): void {
  }
  handleRate(event: number) {
    console.log(event);
  }

}
