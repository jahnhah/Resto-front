import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WsService } from 'src/app/services/ws.service';

@Component({
  selector: 'app-rpanel',
  templateUrl: './rpanel.component.html',
  styleUrls: ['./rpanel.component.css']
})
export class RpanelComponent implements OnInit {
  items = [{
    label: 'home',
    url: '/',
    event: ''
  }, {
    label: 'Ajout plat',
    url: '',
    event: 'modal_plat'
  }];
  modal_text = { title: 'Ajout Plat', button: 'Ajouter' };

  restaurant: any;
  plats: Array<any> = [];
  plat_model: { _id: string, nom: string, prix: number, restaurant: string } = { _id: '', nom: '', prix: 0, restaurant: '' };
  commandes: Array<any> = [];
  livreurs: Array<any> = [];
  closeResult = '';
  keyword = 'nom';

  selectedFile!: File

  constructor(private modalService: NgbModal, private ws: WsService, private router: Router) {
  }


  async ngOnInit() {
    if (localStorage.getItem('type') != 'restaurant') {
      this.router.navigate(['/login'])
    }
    this.loadCommandes();
    await this.loadRestaurant();
    if (this.restaurant != null) {
      this.plat_model.restaurant = this.restaurant._id;
      this.loadPlats();
    }


  }

  loadCommandes() {
    this.ws.getCommandes().subscribe((data: any) => {
      this.commandes = data;
      console.log(this.commandes)
    })
  }


  async loadPlats() {
    this.plats = await this.ws.getPlatByResto(this.restaurant._id).toPromise();
    console.log(this.plats);
  }

  async loadRestaurant() {
    this.restaurant = await this.ws.getRestaurant().toPromise()
  }

  open(content: any) {
    this.modal_text = { title: 'Ajout Plat', button: 'Ajouter' };
    this.plat_model = { _id: '', nom: '', prix: 0, restaurant: this.restaurant._id };
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}1`;
    },
      (reason) => {
        this.closeResult = `Dismissed error`;
      })
  }

  handleButton(content: any, p: any) {
    this.plat_model = p;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modal_text = { title: 'edit', button: 'Sauvegarder' }
  }

  addPlat() {
    this.ws.addPlat(this.plat_model).subscribe((data: any) => this.plats.push(data));
  }

  async updatePlat() {
    await this.ws.updatePlat({ plat: this.plat_model }).toPromise();
    this.loadPlats();
  }

  async deletePlat() {
    await this.ws.deletePlat(this.plat_model._id).toPromise();
    this.loadPlats();
  }

  updateCommande(id: string) {
    let body = { id: id, etat: 'pret' }
    this.ws.updateCommande(body).subscribe((data: any) => this.loadCommandes())
  }

  selectEvent(item: any) {
    // do something with selected item
  }

  onUpload() {
    let uploadData = new FormData();
    uploadData.set('myFile', this.selectedFile, this.selectedFile.name);
    this.ws.uploadImage(uploadData).subscribe(event => {
      console.log(event); // handle event here
    });
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0]
  }







}
