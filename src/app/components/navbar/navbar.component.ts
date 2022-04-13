import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { WsService } from 'src/app/services/ws.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()
  search!: boolean

  @Input()
  items!: Array<{ label: string, url: string, event: string }>

  @Output() navEvent = new EventEmitter<string>();
  goTo(url: string, event: string) {
    if (url == '') {
      return this.navEvent.emit(event);
    }
    this.router.navigate(['/', url]);

  }
  constructor(private router: Router, private ws: WsService) {
    this.items = [{ label: 'login', url: 'login', event: '' }, { label: 'register', url: 'register', event: '' }]
  }

  logout() {
    console.log('logout')
    this.ws.logout();
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
  }



}
