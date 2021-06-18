export class addressModel {
  id: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  phoneNumber : string;
  userId: number;

  constructor() {
    this.id = 0;
    this.address = '';
    this.city = '';
    this.state = '';
    this.country = '';
    this.zipcode = '';
    this.phoneNumber = '';
    this.userId = 0;
  }
}
