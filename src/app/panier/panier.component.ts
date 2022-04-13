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
  toast = false;
  total = 0
  toast_text = ''

  constructor(private ws: WsService, private modalService: NgbModal, private router: Router) {

  }

  ngOnInit(): void {
    this.loadPanier();
    this.initName();
    this.calcul_total()
  }

  initName() {
    for (var i = 0; i < this.paniers.length; i++) {
      this.name[i] = 'name' + i;
      this.input[i] = this.paniers[i].nb;
    }
  }

  calcul_total() {
    for (var i = 0; i < this.paniers.length; i++) {
      this.paniers[i].sommme = this.paniers[i].prix * this.paniers[i].nb;
      this.total += this.paniers[i].sommme
    }
  }
  calculer_st(event: any, index: number) {
    this.total = 0;
    this.paniers[index].nb = event.target.value
    this.calcul_total()
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
    this.toast_text = 'Panier sauvegardé'
    this.toast = true
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
    this.paniers = [];
    localStorage.removeItem('panier');
    this.modalService.dismissAll()
    this.toast_text = 'Commander avec succès'
  }

}
