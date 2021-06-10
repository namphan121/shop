import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    public userService: LoginServiceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  form!: FormGroup;
  loading = false;
  submitted = false;
  public RegisterForm: any;
  get f() {
    return this.form.controls;
  }

  createForm() {
    this.RegisterForm = this.formBuilder.group({
      email: '',
      password: '',
      username: '',
      age : ''
    });
  }
  Register() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.userService
      .register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: (error) => {
          this.loading = false;
        },
      });
  }
}
