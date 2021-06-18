import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { addressModel } from '../model/address.model';
import { fileModel } from '../model/file.model';
import { itemModel } from '../model/item.model';
import { Order } from '../model/orderDetails.model';
import { userModel } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
    this.prodSubject = new BehaviorSubject<itemModel>(
      JSON.parse(localStorage.getItem('user') || 'null')
    );
    this.prod = this.prodSubject.asObservable();
  }

  private prodSubject: BehaviorSubject<itemModel>;
  public prod: Observable<itemModel>;

  createProduct(item: any): Observable<itemModel> {
    return this.http.post<itemModel>(`${this.api}products`, item);
  }

  getProductById(id: number): Observable<itemModel> {
    return this.http.get<itemModel>(`${this.api}products/${id}`);
  }

  getProduct(): Observable<itemModel[]> {
    return this.http.get<itemModel[]>(`${this.api}products`);
  }

  deleteProduct(id: number): Observable<itemModel[]> {
    return this.http.delete<itemModel[]>(`${this.api}products/${id}`);
  }

  updateProduct(item: itemModel): Observable<itemModel> {
    return this.http.put<itemModel>(`${this.api}products/${item.id}`, {
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
    });
  }

  orderCart(item: any): Observable<Order> {
    return this.http.post<Order>(`${this.api}orders`, item);
  }

  createAddress(address: any): Observable<addressModel> {
    return this.http.post<addressModel>(`${this.api}addresses`, address);
  }

  getOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.api}orders`);
  }

  updateStatusState(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.api}orders/state/${order.id}`, {
      approved: order.approved,
    });
  }
}
