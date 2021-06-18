import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { fileModel } from 'src/app/model/file.model';
import { itemModel } from 'src/app/model/item.model';
import { ApiService } from 'src/app/services/api.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent implements OnInit {
  public fileToUpload: File | undefined;
  public message!: string;
  formProduct!: FormGroup;
  showAdd = false;
  imageUrl: any;
  subscription!: Subscription;
  item!: itemModel;
  img!: fileModel;
  imgID!: string;

  items: itemModel[] = [];
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private route: Router,
    private apiFile: UploadFileService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadData();
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

  show() {
    this.showAdd = true;
  }

  hide() {
    this.showAdd = false;
  }

  createForm() {
    this.formProduct = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  addProd() {
    const product = this.formProduct.value;
    product.userId = parseInt(this.auth.getId());
    console.log(product);
    this.subscription = this.apiService
      .createProduct(product)
      .subscribe((data) => {
        this.uploadFile(data.id);
        this.createForm();
        this.showAdd = false;
        this.loadData();
        this.loadImages();
      });
  }

  loadData() {
    this.subscription = this.apiService.getProduct().subscribe((data: any) => {
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

  uploadFile(id: number) {
    const image = {
      file: this.fileToUpload,
      productId: id,
    };
    this.apiFile.addFile(image).subscribe((data) => {
      console.log(data.id);
    });
  }

  deleteProd(id: number) {
    this.subscription = this.apiService.deleteProduct(id).subscribe((data) => {
      this.loadData();
    });
  }

  editProduct(productId: number) {
    this.route.navigate([`/editAdmin/`], { queryParams: { id: productId } });
  }
}
