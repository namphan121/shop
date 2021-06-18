export class Order {
  approved:	boolean;
  id:	number;
  orderBy:	string
  orderDetails: OrderDetails[];
  userId: number;

  constructor() {
    this.id = 0;
    this.approved = false;
    this.orderBy = '';
    this.orderDetails = [];
    this.userId = 0;
  }
}

export class OrderDetails {
  id!: number;
  productName: string;
  productId: number;
  orderId!: number;
  quantity: number;
  productPrice : number;

  constructor() {
    this.productName = '';
    this.productId = 0;
    this.quantity = 0;
    this.productPrice = 0;
  }
}
