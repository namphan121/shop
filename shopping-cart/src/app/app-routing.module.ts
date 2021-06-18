import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { EditProdComponent } from './admin/edit-prod/edit-prod.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { ViewOrderComponent } from './admin/view-order/view-order.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'address', component: AddressComponent },
  { path: 'cart', component: CartComponent },
  { path: 'homeAdmin', component: HomeAdminComponent },
  { path: 'editAdmin', component: EditProdComponent },
  { path: 'order', component: ViewOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
