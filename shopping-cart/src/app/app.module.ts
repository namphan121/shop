import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AddressComponent } from './address/address.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginServiceService } from './services/login-service.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { EditProdComponent } from './admin/edit-prod/edit-prod.component';
import { ViewOrderComponent } from './admin/view-order/view-order.component';
import { StatusPipe } from './pipes/status.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    RegisterComponent,
    HomeComponent,
    AddressComponent,
    CartComponent,
    HomeAdminComponent,
    EditProdComponent,
    ViewOrderComponent,
    StatusPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    LoginServiceService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
