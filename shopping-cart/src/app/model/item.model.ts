export class itemModel {
  id: number;
  name: string;
  description: string;
  price: any;
  quantity: any;
  imageUrl: any;
  userId: number;
  imageDate: any;

  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.price = 0;
    this.quantity = 0;
    this.userId = 0;
  }
}
