import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(private auth: AuthService,private route: Router) {
  }
  public loggedType!: string;
  ngOnInit(): void {
     const roles = this.auth.getRoles();
    this.loggedType = roles.map((item: any) => item.nameRole).join(",");
  }
  logout(){
    this.auth.removeToken();
    this.route.navigate(['/login']);
  }
}
