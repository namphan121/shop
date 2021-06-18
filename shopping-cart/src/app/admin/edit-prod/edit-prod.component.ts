import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { itemModel } from 'src/app/model/item.model';
import { ApiService } from 'src/app/services/api.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-edit-prod',
  templateUrl: './edit-prod.component.html',
  styleUrls: ['./edit-prod.component.css'],
})
export class EditProdComponent implements OnInit {
  public fileToUpload: File | undefined;
  public message!: string;
  formProduct!: FormGroup;
  imageUrl: any = '/assets/img/noimage.png';
  subscription!: Subscription;
  items: itemModel[] = [];
  prod: any = new itemModel();

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private apiFile :UploadFileService
  ) {}

  createForm() {
    this.formProduct = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.loadProduct();

 }

  loadProduct() {
    const id = this.route.snapshot.queryParams['id'];
    this.subscription = this.apiService
      .getProductById(id)
      .subscribe((data: any) => {
        this.prod = data;
        this.formProduct.controls['name'].setValue(this.prod.name);
        this.formProduct.controls['description'].setValue(this.prod.description);
        this.formProduct.controls['quantity'].setValue(this.prod.quantity);
        this.formProduct.controls['price'].setValue(this.prod.price);
        this.loadImage(data);
        console.log(this.prod);
      });
  }

  selectFile(event: any) {
    if (event.target) {
      const file = event.target.files[0];
      this.fileToUpload = file;
      var mintype = event.target.files[0].type;
      if (mintype.match(/image\/*/ == null)) {
        this.message = 'only images are supported';
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imageUrl = reader.result;
      };
    }
  }

  loadData() {
    this.subscription = this.apiService
      .getProduct()
      .subscribe((data: itemModel[]) => {
        this.items = data;

      });
  }

  editProd() {
    this.prod.name = this.formProduct.controls['name'].value;
    this.prod.description = this.formProduct.controls['description'].value;
    this.prod.quantity = this.formProduct.controls['quantity'].value;
    this.prod.price = this.formProduct.controls['price'].value;
    this.subscription = this.apiService
      .updateProduct(this.prod)
      .subscribe((data: itemModel) => {
        this.updateProd(data);
        this.uploadFile(data.id);
        this.loadData();
        this.router.navigate([`/homeAdmin`]);
      });
  }
  uploadFile(id: number) {
    const image = {
      file: this.fileToUpload,
      productId: id,
    };
    this.apiFile.addFile(image).subscribe((data) => {
      console.log(data.id);
    });
  }

  updateProd(data: any) {
    data.id = this.route.snapshot.queryParams['id'];
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].id === data.id) {
        this.items[i].id = data;
        break;
      }
    }
  }

  loadImages() {
    if (this.items && this.items.length > 0) {
      this.items.forEach((item) => {
        this.loadImage(item);
      });
    }
  }

  loadImage(item: itemModel) {
    this.apiFile.getBlobThumbnail(item.imageUrl).subscribe((res) => {
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
}
