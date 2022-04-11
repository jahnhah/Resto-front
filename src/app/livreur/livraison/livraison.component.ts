import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WsService } from 'src/app/services/ws.service';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})
export class LivraisonComponent implements OnInit {
  commandes = [];
  constructor(private ws: WsService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('type') != 'livreur') {
      this.router.navigate(['/login'])
    }
    this.loadCommandes();
  }
  loadCommandes() {
    this.ws.getCommandes().subscribe((data: any) => {
      this.commandes = data;
      console.log(data)
    })
  }

  async updateState(c: any) {
    let body = { id: c._id, etat: 'fini' }
    await this.ws.updateCommande(body).toPromise();
    this.loadCommandes();
  }

}
