import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public userService: LoginServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.createForm();
  }
  public user = [];
  form!: FormGroup;
  private loggedType!: string;
  public loginForm: any;
  error = false;
  loading = false;
  submitted = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }
  get f() {
    return this.form.controls;
  }

  Login() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.userService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          const roles = this.auth.getRoles();
          this.loggedType = roles.map((item: any) => item.nameRole).join(',');
          if (this.loggedType.toLowerCase().includes('admin')) {
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/homeAdmin';
            this.router.navigateByUrl(returnUrl);
          } else if (this.loggedType.toLowerCase().includes('customer')) {
            const returnUrl =
            this.route.snapshot.queryParams['returnUrl'] || '/home';
          this.router.navigateByUrl(returnUrl);
          }
        },
        error: (error) => {
          this.loading = false;
        },
      });
  }
}
