import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GuestGuard implements CanActivate {
  
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(!this.authService.isUserEmailLoggedIn) {
      this.router.navigate(['login'])
    }
    return true;
  }

}