import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  tab=new Array(3)
  constructor() { }

  ngOnInit(): void {
  }

  calculer_st(event:any,prix:number){
    return event.value*prix;
  }

}
