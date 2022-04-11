import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  @Input()
  mini: boolean = false;
  open: boolean = false;
  @Input()
  public commande: any = {};

  @Input()
  public label!: string;

  @Output()
  newItemEvent = new EventEmitter<string>();
  addNewItem() {
    this.newItemEvent.emit('value');
  }

  constructor() { }

  ngOnInit(): void {
    // this.fakeInit()
  }
}
