import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WsService } from 'src/app/services/ws.service';

@Component({
  selector: 'app-restaurant-plat',
  templateUrl: './restaurant-plat.component.html',
  styleUrls: ['./restaurant-plat.component.css']
})
export class RestaurantPlatComponent implements OnInit {

  constructor(private ws: WsService, private actr: ActivatedRoute) { }

  plats: Array<any> = [];
  ngOnInit(): void {
    this.loadPlat();
  }

  loadPlat() {
    const id = this.actr.snapshot.paramMap.get('id');
    this.ws.getPlatByResto(id || '').subscribe((data: any) => this.plats = data);
  }
}
