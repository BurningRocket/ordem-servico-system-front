import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { TokenPayloadDto } from '../models/token-payload-dto.model';

@Injectable({
  providedIn: 'root'
})

//TODO: Adaptar o auth guard para novas roles
export class AuthGuard implements CanActivate{

    constructor(private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (!this.hasToken()) {
            this.router.navigate(['/auth/login']);
            return false;
        }

        const requiredRoles = route.data['roles'] as string[];

        if (requiredRoles) {
            if (!this.hasRoles(requiredRoles)) {
                this.router.navigate(['/']);
                return false;
            }
        }

        return true;

    }

    hasRoles(requiredRoles: string[]) {
        const tokenPayload = this.getTokenPayload();

        if (!tokenPayload) {
            return false;
        }

        if(tokenPayload.role === 'ROOT' || requiredRoles.some(role => tokenPayload.role === role)){
            return true;
        }

        return false;
    }

    hasToken() {
        return window.localStorage.getItem('token') !== null;
    }

    getToken() {
        return window.localStorage.getItem('token');
    }

    getTokenPayload() {
        const token = this.getToken();

        if (!token) {
            return null;
        }

        const tokenPayload = jwtDecode<TokenPayloadDto>(token);

        return tokenPayload;
    }
}
