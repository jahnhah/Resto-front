import { Component, OnInit, HostListener } from '@angular/core';
import { WsService } from '../services/ws.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  restaurants: Array<any> = [];
  plats: Array<any> = [];
  slides: Array<any> = [];
  menus: Array<any> = [];
  nom: string = "";
  screenWidth!: number

  constructor(private ws: WsService, private modalService: NgbModal, private router: Router) {
    this.getScreenSize('')
  }
  restaurants_to_slide() {
    this.slides = [];

    for (let i = 0; i < this.restaurants.length / 4; i++) {
      this.slides.push({ id: i, data: this.restaurants.slice(i * 4, (i * 4) + 4) })
    }
  }
  ngOnInit(): void {
    this.loadRestaurants();
    this.loadPlats();
  }

  loadRestaurants() {
    this.ws.getRestaurants().subscribe((data: any) => {
      this.restaurants = data;
      this.restaurants_to_slide();
    });
  }

  loadPlats() {
    this.ws.getPlats().subscribe((data: any) => {
      this.plats = data;
    });
  }

  search() {
    if (!this.nom) return
    this.ws.searchPlats(this.nom).subscribe((data: any) => {
      this.plats = data;
    });
    this.ws.searchRestaurants(this.nom).subscribe((data: any) => {
      this.restaurants = data;
      this.restaurants_to_slide();
    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  navigateTo(id: string) {
    this.router.navigate(['/RestoPlat/' + id]);
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event: any) {
    this.screenWidth = window.innerWidth;
  }

  logout() {
    this.ws.logout()
    this.router.navigate(['/login'])
  }
}
