import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tab=[1,2,3,4,5,6,7]
  slides:Array<any>=[]
  constructor() { }
  tab_to_slide(){
    for(let i=0;i<this.tab.length/4;i++){
      this.slides.push({id:i,data:this.tab.slice(i,4)})
    }
  }
  ngOnInit(): void {
    this.tab_to_slide();
    console.log(this.slides)
  }

}
