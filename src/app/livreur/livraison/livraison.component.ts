import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WsService } from 'src/app/services/ws.service';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})
export class LivraisonComponent implements OnInit {
  commandes = [];
  toast = false;
  toast_text = '';
  constructor(private ws: WsService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (localStorage.getItem('type') != 'livreur') {
      this.router.navigate(['/login'])
    }
    this.loadCommandes();
  }
  loadCommandes() {
    this.spinner.show()
    this.ws.getCommandes().subscribe((data: any) => {
      this.commandes = data;
      this.spinner.hide();
    })
  }

  async updateState(c: any) {
    this.spinner.show();
    let body = { id: c._id, etat: 'fini' }
    await this.ws.updateCommande(body).toPromise();
    this.loadCommandes();
    this.spinner.hide()
    this.toast_text = 'livraison achevé'
    this.toast = true
  }

}
