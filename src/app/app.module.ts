import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { PlatComponent } from './plat/plat.component';
import { PanierComponent } from './panier/panier.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CpanelComponent } from './admin/cpanel/cpanel.component';
import { CommandesComponent } from './admin/commandes/commandes.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { GraphComponent } from './admin/graph/graph.component';
import { RpanelComponent } from './resto/rpanel/rpanel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RestaurantPlatComponent } from './client/restaurant-plat/restaurant-plat.component';
import { LivraisonComponent } from './livreur/livraison/livraison.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommandeUserComponent } from './client/commande-user/commande-user.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RestaurantComponent,
    PlatComponent,
    PanierComponent,
    HomeComponent,
    CpanelComponent,
    CommandesComponent,
    GraphComponent,
    RpanelComponent,
    NavbarComponent,
    RestaurantPlatComponent,
    LivraisonComponent,
    FooterComponent,
    CommandeUserComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AutocompleteLibModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
