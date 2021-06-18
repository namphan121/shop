import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { itemModel } from '../model/item.model';
import { OrderDetails } from '../model/orderDetails.model';
import { ApiService } from '../services/api.service';
import { UploadFileService } from '../services/upload-file.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private apiFile: UploadFileService,
    private auth : AuthService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  items: itemModel[] = [];
  subscription!: Subscription;

  loadData() {
    this.subscription = this.apiService
      .getProduct()
      .subscribe((data: any) => {
        this.items = data;

        this.loadImages();
      });
  }

  loadImages() {
    if (this.items && this.items.length > 0) {
      this.items.forEach((item) => {
        this.loadImage(item);
      });
    }
  }

  loadImage(item: itemModel) {
    this.apiFile.getBlobThumbnail(item.imageUrl.toString()).subscribe((res) => {
      this.createImageFromBlob(res, item);
    });
  }

  createImageFromBlob(image: Blob, item: itemModel) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        item.imageDate = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  addCart(product: any) {
    let orderCart = JSON.parse(localStorage.getItem('localCart') || '[]');

    const orderProduct = orderCart.find((item: any) => item.productId == product.id);
    if (orderProduct) {
      orderProduct.quantity += 1;
    } else {
      const orderDetail = new OrderDetails();
      orderDetail.productId = product.id;
      orderDetail.productName = product.name;
      orderDetail.quantity = 1;
      orderDetail.productPrice = product.price;
      orderCart.push(orderDetail)
    }

    localStorage.setItem('localCart', JSON.stringify(orderCart));
  }
}
