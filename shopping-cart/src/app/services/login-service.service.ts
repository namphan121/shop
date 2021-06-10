import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { userModel } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(public http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<userModel>(
      JSON.parse(localStorage.getItem('user') || 'null')
    );
    this.user = this.userSubject.asObservable();
  }

  private api = 'http://localhost:8080/api/auth/';

  private userSubject: BehaviorSubject<userModel>;
  public user: Observable<userModel>;

  public get userValue(): userModel {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<userModel>(`${this.api}signin`, {
        username,
        password,
      })
      .pipe(
        map((user: userModel) => {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', user.token);
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.userSubject.next(null!);
    this.router.navigate(['/login']);
  }
  register(user: userModel) {
    return this.http.post(`${this.api}signup`, user);
  }
}
