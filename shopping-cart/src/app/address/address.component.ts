import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  formAddress!: FormGroup;
  subscription!: Subscription;
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {this.createForm()}

  createForm() {
    this.formAddress = this.formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  createAddress() {
    const address = this.formAddress.value;
    address.userId = parseInt(this.auth.getId())
    console.log(address);
    this.subscription = this.apiService
      .createAddress(address)
      .subscribe((data) => {
        console.log(data);

        this.createForm();
      });
  }
}
