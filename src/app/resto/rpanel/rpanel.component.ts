import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { WsService } from 'src/app/services/ws.service';

@Component({
  selector: 'app-rpanel',
  templateUrl: './rpanel.component.html',
  styleUrls: ['./rpanel.component.css']
})
export class RpanelComponent implements OnInit {
  items = [{
    label: 'Ajout plat',
    url: '',
    event: 'modal_plat'
  }];
  modal_text = { title: 'Ajout Plat', button: 'Ajouter' };
  toast: boolean = false;
  toast_text = 'Ajout succes'
  restaurant: any;
  plats: Array<any> = [];
  plat_model: { _id: string, nom: string, prix: number, restaurant: string } = { _id: '', nom: '', prix: 0, restaurant: '' };
  commandes: Array<any> = [];
  livreurs: Array<any> = [];
  closeResult = '';
  keyword = 'nom';
  benefice!: Array<any>

  selectedFile!: File

  constructor(private modalService: NgbModal, private ws: WsService, private router: Router, private spinner: NgxSpinnerService) {
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
      this.loadBenefice()
    }


  }

  loadCommandes() {
    this.spinner.show()
    this.ws.getCommandes().subscribe((data: any) => {
      this.commandes = data;
      this.spinner.hide()
    })
  }


  async loadPlats() {
    this.spinner.show();
    this.plats = await this.ws.getPlatByResto(this.restaurant._id).toPromise();
    this.spinner.hide()
  }

  async loadRestaurant() {
    this.spinner.show();
    this.restaurant = await this.ws.getRestaurant().toPromise()
    this.spinner.hide()
  }
  async loadBenefice() {
    this.ws.getBenefice(this.restaurant._id).subscribe((data) => this.benefice = [...data])
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
    this.ws.addPlat(this.plat_model).subscribe((data: any) => {
      this.plats.push(data)
      this.modalService.dismissAll();
      this.show_toast()
    });
  }

  async updatePlat() {
    this.spinner.show()
    await this.ws.updatePlat({ plat: this.plat_model }).toPromise();
    this.modalService.dismissAll();
    this.loadPlats();
    this.spinner.hide();
    this.toast_text = 'Modification succès';
    this.show_toast();
  }

  async deletePlat() {
    this.spinner.show()
    await this.ws.deletePlat(this.plat_model._id).toPromise();
    this.modalService.dismissAll();
    this.loadPlats();
    this.spinner.hide();
    this.toast_text = 'Suppression succès';
    this.show_toast();
  }

  updateCommande(id: string) {
    this.spinner.show();
    let body = { id: id, etat: 'pret' }
    this.ws.updateCommande(body).subscribe((data: any) => { this.loadCommandes(); this.spinner.hide() })
    this.toast_text = 'Modification succès';
    this.show_toast();
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

  show_toast() {
    this.toast = true
  }







}
