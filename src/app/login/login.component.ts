import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { WsService } from '../services/ws.service';
const jwt = new JwtHelperService();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  logins={
    email:'',
    pwd:''
  }
  error:string=''
  private decodedToken={}
  constructor(private ws:WsService) { 

  }

  ngOnInit(): void {
    this.ws.logout()
    this.ws.getItems().subscribe((data:any)=>{
      console.log(data)
    })
  }

  login(){
    this.ws.login(this.logins).subscribe((data:any)=>{
      this.ws.saveToken(data.token)
      this.error=''
    },(error:any)=>this.error=error.error)
  }

}
