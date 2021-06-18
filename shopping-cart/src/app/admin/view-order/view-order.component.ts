import { Component, OnInit } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Subscription } from 'rxjs';
import { Order, OrderDetails } from 'src/app/model/orderDetails.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css'],
})
export class ViewOrderComponent implements OnInit {
  subscription!: Subscription;
  status!: string;
  order!: Order;
  orders: Order[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadOrder();

  }

  loadOrder() {
    this.subscription = this.apiService.getOrder().subscribe((data: any) => {
      this.orders = data;
      console.log(data);

    });
  }

  updateStatusApprove(order: Order) {
    this.subscription = this.apiService
      .updateStatusState(order)
      .subscribe((data) => {
        this.loadOrder();
      });
  }
  updateStatusDeclined(order: Order) {
    this.subscription = this.apiService
      .updateStatusState(order)
      .subscribe((data) => {

        this.loadOrder();
      });
  }

  // loadStatus() {
  //   if (this.order.approved == true) {
  //     this.status = 'Approved';
  //   } else {
  //     this.status = 'Declined';
  //   }
  // }
}
