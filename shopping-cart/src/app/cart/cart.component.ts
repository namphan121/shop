import { Component, OnInit } from '@angular/core';
import { item } from '../model/item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  totalSum = 0;
  price = 0;
  quantity = 0;
  item : item[] = [
    {
      id : 1,
      name : "Ghế",
      image : '/assets/img/pro1.jpg',
      description : "ghế này ngồi rất sướng luôn nhó",
      price : 18000,
      quantity : 12
    }
  ]

}
