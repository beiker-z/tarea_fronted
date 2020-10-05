import { UserService } from './services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {

  constructor(private loginService: UserService, public router: Router) { }

  canActivate(): boolean {
    if (!this.loginService.checkauthen()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
