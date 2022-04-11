import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.css']
})
export class PlatComponent implements AfterViewInit {

  icons = [
    { id: 'buy', url: '../../assets/shopping-cart.png' },
    { id: 'cog', url: '../../assets/cog.png' },
  ]

  @Input()
  icon!: string

  @Input()
  plat: any

  @Input()
  show_restaurant!: boolean

  @Output()
  buttonEvent = new EventEmitter<string>();

  constructor(private router: Router) { }
  evokeEvent() {
    if (this.icon == 'cog') this.buttonEvent.emit('edit');
    if (this.icon == 'buy') {
      let panier = {
        _id: this.plat._id,
        nom: this.plat.nom,
        prix: this.plat.prix
      }
      this.addPanier(panier, 1);
      this.router.navigate(['/panier/']);
    }
  }


  @ViewChild('ico')
  ico!: ElementRef


  ngAfterViewInit(): void {
    let url = this.icons.find(i => i.id == this.icon)?.url;
    this.ico.nativeElement.src = url;
    console.log(this.ico.nativeElement.src)
  }

  addPanier(plat: any, nb: number) {
    var panier = {
      _id: plat._id,
      nb: nb,
      nom: plat.nom,
      prix: plat.prix
    };
    var tab: Array<any> = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier') || '') : [];

    tab.map((t: any) => {
      if (t._id == plat._id) {
        t.nb += nb;
      }
    });

    if (!tab.find(t => t._id == plat._id)) {
      tab.push(panier);
    }


    console.log(tab)
    localStorage.setItem('panier', JSON.stringify(tab));
  }

}
