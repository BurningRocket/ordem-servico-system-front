import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RolesEnum } from '../models/roles-enum';
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

        if (!this.hasToken() || !this.hasRoles([RolesEnum.ADMIN, RolesEnum.INSTALADOR])) {
            this.router.navigate(['/auth/login']);
            return false;
        }

        const requiredRoles = route.data['roles'] as number[];

        if (requiredRoles) {
            if (!this.hasRoles(requiredRoles)) {
                this.router.navigate(['/']);
                return false;
            }
        }

        return true;

    }

    hasRoles(requiredRoles: number[]) {
        const tokenPayload = this.getTokenPayload();

        if (!tokenPayload) {
            return false;
        }

        tokenPayload.roles = tokenPayload.roles.map(role => Number(role));

        if(tokenPayload.roles.includes(RolesEnum.ADMIN) || tokenPayload.roles.some(role => requiredRoles.includes(role))){
            return true;
        }

        return false;
    }

    hasPermissions(requiredPermission: string) {
        const tokenPayload = this.getTokenPayload();

        if (!tokenPayload) {
            return false;
        }

        if(tokenPayload.permissions.some(permission => requiredPermission === permission)){
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
