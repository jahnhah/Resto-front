import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WsService } from '../services/ws.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  tab = new Array(3);
  paniers: Array<any> = [];
  input: Array<number> = [];
  name: Array<string> = [];
  date!: Date;

  constructor(private ws: WsService, private modalService: NgbModal, private router: Router) {

  }

  ngOnInit(): void {
    this.loadPanier();
    this.initName();
  }

  initName() {
    for (var i = 0; i < this.paniers.length; i++) {
      this.name[i] = 'name' + i;
      this.input[i] = this.paniers[i].nb;
    }
  }

  calculer_st(event: any, prix: number) {
    return event.value * prix;
  }

  loadPanier() {
    if (localStorage.getItem('panier')) {
      this.paniers = JSON.parse(localStorage.getItem('panier') || '');
      console.log(this.paniers)
    }

  }

  removeFromPanier(id: string) {
    console.log(this.paniers.indexOf(this.paniers.find(e => e._id == id)))
    var index = this.paniers.indexOf(this.paniers.find(e => e._id == id))
    if (index > -1) {
      console.log(index)
    }
    this.paniers.splice(index, 1);
    console.log('spliced', this.paniers);
    localStorage.setItem('panier', JSON.stringify(this.paniers));
  }

  sauvegarder() {
    for (var i = 0; i < this.paniers.length; i++) {
      this.paniers[i].nb = this.input[i];
    }
    localStorage.setItem('panier', JSON.stringify(this.paniers));
  }
  format() {
    let plats: Array<any> = [];
    this.paniers.forEach(p => {
      plats.push({ plat: p._id, nb: p.nb });
    });
    return plats;
  }

  open(content: any): any {
    if (!localStorage.getItem('auth_tkn')) {
      return this.router.navigate(['/login'])
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  commander() {
    this.sauvegarder();
    let plats_formated = this.format();
    let body = {
      plats: plats_formated,
      dateLivraison: this.date,
      etat: 'nouveau'
    };
    console.log(body)
    this.ws.createCommande(body).subscribe((data) => console.log(data));
    localStorage.removeItem('panier');
  }

}
