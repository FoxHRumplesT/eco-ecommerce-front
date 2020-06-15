import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const hasToken = !!sessionStorage.getItem('t');
    if (hasToken) return true;
    this.router.navigate(['/']);
    return false;
  }

}
