import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('auth_tkn') || ''
    }
  )
};
// const base_url = 'http://localhost:9000';
const base_url = 'https://ekaly-back.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class WsService {
  jwt = new JwtHelperService()
  constructor(private http: HttpClient) {
  }

  getItems(): Observable<object> {
    return this.http.get(base_url + '/menu', httpOptions);
  }

  insertUtilisateur(utilisateur: any): Observable<any> {
    return this.http.post(base_url + '/utilisateur/register', utilisateur, httpOptions)
  }

  login(login: any): Observable<any> {
    return this.http.post(base_url + '/utilisateur/login', login, httpOptions)
  }

  saveToken(token: any): any {
    const decodedToken = this.jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(decodedToken));
    return token;
  }

  getRestaurants(): Observable<object> {
    return this.http.get(base_url + '/restaurant/', httpOptions)
  }

  getRestaurant(): Observable<any> {
    return this.http.get(base_url + '/restaurant/getByUtilisateur', httpOptions);
  }

  searchRestaurants(nom: string): Observable<any> {
    return this.http.get(base_url + "/restaurant/search/" + nom, httpOptions);
  }

  getPlatByResto(restaurant: string): Observable<any> {
    return this.http.get(base_url + '/plat/getByResto/' + restaurant, httpOptions)
  }

  addPlat(plat: any): Observable<any> {
    return this.http.post(base_url + '/plat', plat, httpOptions);
  }

  updatePlat(body: any): Observable<any> {
    return this.http.put(base_url + '/plat/' + body.plat._id, body, httpOptions);
  }

  deletePlat(id: string): Observable<any> {
    return this.http.delete(base_url + '/plat/' + id, httpOptions);
  }

  getMenus(): Observable<object> {
    return this.http.get(base_url + '/menu', httpOptions)
  }

  getPlats(): Observable<any> {
    return this.http.get(base_url + "/plat", httpOptions);
  }

  searchPlats(nom: string): Observable<any> {
    return this.http.get(base_url + "/plat/search/" + nom, httpOptions);
  }
  getLivreurs(): Observable<object> {
    return this.http.get(base_url + '/utilisateur/getByType?type=livreur', httpOptions)
  }
  getCommandes(): Observable<any> {
    return this.http.get(base_url + '/commande', httpOptions)
  }
  logout() {
    localStorage.removeItem('auth_tkn')
    localStorage.removeItem('auth_meta')
  }

  createRestaurant(body: any): Observable<object> {
    return this.http.post(base_url + '/restaurant', body, httpOptions)
  }

  createCommande(body: any): Observable<any> {
    return this.http.post(base_url + '/commande', body, httpOptions)
  }

  updateCommande(body: any): Observable<any> {
    return this.http.put(base_url + '/commande', body, httpOptions);
  }

  createLivraison(body: any): Observable<any> {
    return this.http.post(base_url + '/livraison', body, httpOptions);
  }

  bulkUpdateCommande(body: any): Observable<any> {
    console.log('Bulkkkkkkk')
    return this.http.put(base_url + '/commande/bulk', body, httpOptions);
  }

  public uploadImage(uploadData: FormData): Observable<object> {
    return this.http.post(base_url + '/plat/images/upload', uploadData, httpOptions)
  }

  sendMail(body: any): Observable<object> {
    return this.http.post(base_url + '/utilisateur/newsletter', body, httpOptions)
  }

}
