export class fileModel {
  id: string;
  name: string;
  contentType: string;
  size: number;
  data: number;
  url:string;
  image: File | undefined;
  productId: number;

  constructor() {
    this.id = '';
    this.name = '';
    this.size = 0;
    this.data = 0;
    this.url = '';
    this.contentType = '';
    this.productId = 0;
  }
}
