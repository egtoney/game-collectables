import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // wait if loading subject
    if (this.authService.isLoadingSubject.value) {
      await new Promise<void>(resolve => {
        const sub = this.authService.isLoadingSubject.subscribe(isLoading => {
          if (!isLoading) {
            sub.unsubscribe();
            resolve();
          }
        });
      });
    }

    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.authService.logout();
    return false;
  }
}
