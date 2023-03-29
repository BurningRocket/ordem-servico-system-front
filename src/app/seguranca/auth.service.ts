import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import { LoginDTO } from './dto/login-dto.component';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class AuthService  extends BaseService {
    constructor(http: HttpClient, private router: Router) {
        super(http, "/usuario");
    }

    loginLink = '/loginAdmin';
    loginCriar = '/auth/usuarios';

    login(dto: any): Observable<any> {

        let param = {
            login: dto.login,
            senha: dto.senha,
        };
        return this.http.post<any>(
            this.actionUrl+"/login",
            param
        );
    }
    criarLogin(dto: LoginDTO): Observable<LoginDTO> {
        return this.http.post<LoginDTO>(environment.URL + this.loginCriar, {
            login: dto.login,
            senha: dto.senha,
        });
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
