import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { itemModel } from '../model/item.model';
import { Order, OrderDetails } from '../model/orderDetails.model';
import { userModel } from '../model/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {}

  orderCart: any = new Order();
  orderCartDetail: any[] = [];
  formOrder!: FormGroup;
  subscription!: Subscription;
  user: userModel = new userModel();
  ngOnInit(): void {
    this.loadData();
  }
  totalSum = 0;
  price = 0;
  quantity = 0;
  items: itemModel[] = [];

  deleteCart(index: any) {
    this.orderCartDetail.splice(index, 1);
    localStorage.setItem('localCart', JSON.stringify(this.orderCartDetail));
  }

  loadData() {
    this.orderCartDetail = JSON.parse(localStorage.getItem('localCart') || '');
  }

  placeOrder() {
    this.orderCart.userId = parseInt(this.auth.getId());
    this.orderCart.orderBy = this.auth.getEmail();
    this.orderCart.orderDetails = this.orderCartDetail;

    this.subscription = this.apiService
      .orderCart(this.orderCart)
      .subscribe((data) => {
        localStorage.removeItem('localCart');
      });
  }

  updateCart(index: any, quant: any) {
    quant = quant.value;
    this.orderCartDetail[index].quantity = quant;
    localStorage.setItem('localCart', JSON.stringify(this.orderCartDetail));
  }

  getTotal() {
    var total = 0;
    for (var i = 0; i < this.orderCartDetail.length; i++) {
      var item = this.orderCartDetail[i];
      total += item.price * item.quantity;
    }
    return total;
  }
}
