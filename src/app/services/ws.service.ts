import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'auth-token':localStorage.getItem('auth_tkn')||''
    }
  )
};
const base_url='http://localhost:9000';
@Injectable({
  providedIn: 'root'
})
export class WsService {
  jwt=new JwtHelperService()
  constructor(private http: HttpClient) { 
  }

  getItems(): Observable<object> {
    return this.http.get(base_url+'/menu', httpOptions);
  }

  insertUtilisateur(utilisateur:any):Observable<object>{
    return this.http.post(base_url+'/utilisateur/register',utilisateur,httpOptions)
  }

  login(login:any){
    return this.http.post(base_url+'/utilisateur/login',login,httpOptions)
  }

  saveToken(token: any): any {
    const decodedToken = this.jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(decodedToken));
    return token;
  }

  logout(){
    localStorage.removeItem('auth_tkn')
    localStorage.removeItem('auth_meta')
  }

}
