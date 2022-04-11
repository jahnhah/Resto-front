import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { WsService } from '../services/ws.service';
const jwt = new JwtHelperService();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  logins = {
    email: '',
    pwd: ''
  }
  error: string = ''
  private decodedToken = {}
  constructor(private ws: WsService, private router: Router) {

  }

  ngOnInit(): void {
    this.ws.logout()
  }

  async login() {
    let type = '';
    let data = await this.ws.login(this.logins).toPromise()
    this.ws.saveToken(data.token);
    type = data.type;
    localStorage.setItem('type', type);
    this.error = ''

    if (type == 'restaurant') this.router.navigate(['/resto/rpanel'])
    if (type == 'admin') this.router.navigate(['/admin/cpanel'])
    if (type == 'livreur') this.router.navigate(['/livreur/lpanel'])
    if (type == 'utilisateur') this.router.navigate(['/'])
  }

}
