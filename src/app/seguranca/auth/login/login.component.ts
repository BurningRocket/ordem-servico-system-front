import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../../auth.service';
import { LoginDTO } from '../../../models/login-dto.model';
import { MessageService } from 'primeng/api';
import { TokenService } from 'src/app/services/token.service';
import { TokenPayloadDto } from 'src/app/models/token-payload-dto.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent implements OnInit {
    valCheck: string[] = ['remember'];

    loginDto!: LoginDTO;

    loginLoading = false;

    submitted = false;

    formulario!: FormGroup;

    constructor(
        public layoutService: LayoutService,
        private service: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private messageService: MessageService,
        private tokenService: TokenService
    ) { }

    ngOnInit() {
        this.formulario = this.formBuilder.group({
            email: [''],
            password: [''],
        });
    }

    public login() {
        this.loginLoading = true;
        this.submitted = true;

        this.service.login(this.formulario.value).subscribe((data: any) => {
            this.router.navigate(['/']);
            this.service.setToken(data.accessToken);
            this.loginLoading = false;
        }, (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: "Erro ao realizar login" });
            this.loginLoading = false;
        });
    }
}
