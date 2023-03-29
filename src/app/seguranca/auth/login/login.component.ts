import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../../auth.service';
import { LoginDTO } from '../../dto/login-dto.component';
import { MessageService } from 'primeng/api';
import { TokenService } from 'src/app/services/token.service';
import { RolesEnum } from 'src/app/models/roles-enum';
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

    formulario!: FormGroup;

    constructor(
        public layoutService: LayoutService,
        private service: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private messageService: MessageService,
        private tokenService: TokenService
    ) {}

    ngOnInit() {
        this.formulario = this.formBuilder.group({
            login: [''],
            senha: [''],
        });
    }

    public login() {
        this.loginLoading = true;
        this.service.login(this.formulario.value).subscribe((sub) => {
            this.loginLoading = false;

            const tokenPayload: TokenPayloadDto = this.tokenService.parseToken(sub.data.token);
            tokenPayload.roles = tokenPayload.roles.map(role => Number(role));

            const requiredRoles = [RolesEnum.ADMIN, RolesEnum.INSTALADOR];
            const hasPermission = tokenPayload.roles.some(role => requiredRoles.includes(role));

            if(hasPermission){
                this.router.navigate(['/']);
                this.service.pegarToken(sub.data.token);
            }else{
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Você não tem permissão para acessar o sistema' });
            }
        });
    }
}
