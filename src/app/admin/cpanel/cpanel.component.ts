import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map, Observable, OperatorFunction } from 'rxjs';
import { WsService } from 'src/app/services/ws.service';
@Component({
  selector: 'app-cpanel',
  templateUrl: './cpanel.component.html',
  styleUrls: ['./cpanel.component.css']
})
export class CpanelComponent implements OnInit {
  restaurants: any;
  restaurant: any;
  date!: Date;
  tab = new Array(10);
  keyword = 'nom';
  livreurs: Array<any> = [];
  commandes: Array<any> = [];
  toDeliver: Array<any> = [];
  livreur: any;

  @ViewChild('content')
  modal!: ElementRef

  constructor(private modalService: NgbModal, private ws: WsService, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('type') != 'admin') {
      this.router.navigate(['/login'])
    }
    this.loadLivreur();
    this.loadCommandes();
    this.loadRestaurant();
  }

  closeResult = '';
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}1`;
    },
      (reason) => {
        this.closeResult = `Dismissed error`;
      })
  }

  loadRestaurant() {
    this.ws.getRestaurants().subscribe((data: any) => this.restaurants = data)
  }

  selectEvent(item: any) {
    this.livreur = item;
  }

  loadLivreur() {
    this.ws.getLivreurs().subscribe((data: any) => {
      this.livreurs = data;
      console.log(data)
    })
  }

  loadCommandes() {
    this.ws.getCommandes().subscribe((data: any) => {
      this.commandes = data;
      console.log(data)
    })
  }



  restoEvent() {
    console.log(this.restaurant);
  }

  dateEvent() {
    console.log(this.date);
  }

  addDeliver(commande: any) {
    this.open(this.modal);
    if (!this.toDeliver.includes(commande)) {
      this.toDeliver.push(commande);
    }
  }

  removeDeliver(id: string) {
    let index = this.toDeliver.findIndex(x => x._id == id);
    this.toDeliver.splice(index, 1);
  }

  async save() {
    let c_id: Array<any> = [];
    this.toDeliver.forEach(e => {
      c_id.push(e._id)
    });
    let body = { commandes: c_id, livreur: this.livreur._id }
    await this.ws.createLivraison(body).toPromise();
    await this.ws.bulkUpdateCommande({ commandes: c_id }).toPromise();
    this.loadCommandes();

    this.toDeliver = [];
  }
}
