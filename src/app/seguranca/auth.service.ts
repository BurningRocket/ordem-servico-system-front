import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BaseAdminService } from '../layout/base/base-admin.service';
import { BaseService } from './base.service';
import { LoginDTO } from '../models/login-dto.model';

@Injectable({
    providedIn: 'root',
})

export class AuthService  extends BaseAdminService {

    constructor(http: HttpClient, private router: Router) {
        super(http, "/auth");
    }

    public login(loginDTO: LoginDTO) {
        return this.http.post(this.actionUrl + '/login', loginDTO);
    }

    public register(loginDTO: LoginDTO) {
        return this.http.post(this.actionUrl + '/register', loginDTO);
    }

    public getToken(): string {
        return localStorage.getItem('token')!;
    }

    public pegarToken(token: string) {
        localStorage.setItem('token', token);
        this.getToken();
    }

    public logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
    }
}
