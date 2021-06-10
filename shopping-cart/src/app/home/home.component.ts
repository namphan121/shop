import { Component, OnInit } from '@angular/core';
import { item } from '../model/item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  item: item[] =  [
    {
      id : 1,
      name : "Ghế",
      image : '/assets/img/pro1.jpg',
      description : "ghế này ngồi rất sướng luôn nhó",
      price : 18000,
      quantity : 12
    },
    {
      id : 2,
      name : "Ghế",
      image : '/assets/img/pro1.jpg',
      description : "ghế này ngồi rất sướng luôn nhó",
      price : 18000,
      quantity : 12
    },
    {
      id : 3,
      name : "Ghế",
      image : '/assets/img/pro1.jpg',
      description : "ghế này ngồi rất sướng luôn nhó",
      price : 18000,
      quantity : 12
    },
    {
      id : 4,
      name : "Ghế",
      image : '/assets/img/pro1.jpg',
      description : "ghế này ngồi rất sướng luôn nhó",
      price : 18000,
      quantity : 12
    },
    {
      id : 4,
      name : "Ghế",
      image : '/assets/img/pro1.jpg',
      description : "ghế này ngồi rất sướng luôn nhó",
      price : 18000,
      quantity : 12
    }
  ]

}
