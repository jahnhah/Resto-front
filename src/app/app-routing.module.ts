import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandesComponent } from './admin/commandes/commandes.component';
import { CpanelComponent } from './admin/cpanel/cpanel.component';
import { CommandeUserComponent } from './client/commande-user/commande-user.component';
import { RestaurantPlatComponent } from './client/restaurant-plat/restaurant-plat.component';
import { HomeComponent } from './home/home.component';
import { LivraisonComponent } from './livreur/livraison/livraison.component';
import { LoginComponent } from './login/login.component';
import { PanierComponent } from './panier/panier.component';
import { PlatComponent } from './plat/plat.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RpanelComponent } from './resto/rpanel/rpanel.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "restaurant",
    component: RestaurantComponent
  },
  {
    path: "plat",
    component: PlatComponent
  },
  {
    path: "panier",
    component: PanierComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "RestoPlat/:id",
    component: RestaurantPlatComponent
  },
  {
    path: "admin/cpanel",
    component: CpanelComponent
  },
  {
    path: "admin/commandes",
    component: CommandesComponent
  },
  {
    path: "resto/rpanel",
    component: RpanelComponent
  },
  {
    path: "livreur/lpanel",
    component: LivraisonComponent
  },
  {
    path: "commandes",
    component: CommandeUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
