import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WsService } from '../services/ws.service';
import { matchValidator } from './custom.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  actual_step = 1;
  registerGroup = new FormGroup({
    nom: new FormControl('nom', Validators.required),
    email: new FormControl('email', [Validators.email, Validators.required]),
    pwd: new FormControl('pwd', [Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$&>.,;/|\<?*])(?=.*[0-9]){6,12}.{6,}$'), Validators.required]),
    pwdc: new FormControl('pwdc', Validators.required)
  }, {
    validators: matchValidator('pwd', 'pwdc')
  })

  user = {
    email: '',
    nom: '',
    type: '',
    pwd: ''
  }

  error: string = ''

  formValid = (this.registerGroup.errors)
  constructor(private ws: WsService, private router: Router) { }

  ngOnInit(): void {
  }

  next_step() {
    if (this.actual_step < 3 && this.verify_step(this.actual_step)) this.actual_step++
  }

  prev_step() {
    if (this.actual_step > 1) this.actual_step--
    this.error = ''
  }
  set_type(type: string) {
    this.user.type = type;
  }

  verify_step(id_step: number) {
    switch (id_step) {
      case 1:
        this.registerGroup.get('email')?.markAsDirty()
        this.registerGroup.get('nom')?.markAsDirty()
        this.user.email = this.registerGroup.get('email')?.value
        this.user.nom = this.registerGroup.get('nom')?.value
        return this.registerGroup.get('email')?.errors == null && this.registerGroup.get('nom')?.errors == null
      case 2:
        return this.user.type
    }
    return null
  }

  async valider() {
    if (this.registerGroup.get('pwd')?.errors || this.registerGroup.errors) {
      this.registerGroup.get('pwd')?.markAsDirty() && this.registerGroup.get('pwdc')?.markAsDirty()
      console.log(this.registerGroup.errors)
      return
    }
    this.user.pwd = this.registerGroup.get('pwd')?.value;
    const data = await this.ws.insertUtilisateur(this.user).toPromise();
    this.ws.saveToken(data.token);
    // CREATE RESTAURANT
    if (this.user.type == 'restaurant') {
      this.createRestaurant()
    }

    this.router.navigate(['/login'])

  }

  async createRestaurant() {
    let resto = {
      nom: this.registerGroup.get('nom')?.value,
      utilisateur: JSON.parse(localStorage.getItem('auth_meta') || '')._id
    }
    console.log(resto)
    let data = await this.ws.createRestaurant(resto).toPromise()
  }

}
