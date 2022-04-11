import { Component, OnInit } from '@angular/core';
import { WsService } from 'src/app/services/ws.service';

@Component({
  selector: 'app-commande-user',
  templateUrl: './commande-user.component.html',
  styleUrls: ['./commande-user.component.css']
})
export class CommandeUserComponent implements OnInit {
  commandes: Array<any> = []
  constructor(private ws: WsService) {
    this.loadCommandes();
  }

  async loadCommandes() {
    this.commandes = await this.ws.getCommandes().toPromise();
  }
  ngOnInit(): void {
    this.loadCommandes();
    console.log(this.commandes)
  }

}
