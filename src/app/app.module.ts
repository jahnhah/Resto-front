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
import { RpanelComponent } from './restaurant/rpanel/rpanel.component';
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
    RpanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
