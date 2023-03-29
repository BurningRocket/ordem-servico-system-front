import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';
import { TokenService } from 'src/app/services/token.service';
import { TokenPayloadDto } from 'src/app/models/token-payload-dto.model';
import { LoginDTO } from 'src/app/models/login-dto.model';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
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
export class RegisterComponent implements OnInit {
    valCheck: string[] = ['remember'];

    registerDto!: LoginDTO;

    registerLoading = false;

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
            name: [''],
            email: [''],
            password: [''],
        });
    }

    public register() {

        if(this.validateUser()){
            this.registerLoading = true;
            this.service.register(this.formulario.value).subscribe((data: any) => {
                this.router.navigate(['/']);
                this.service.setToken(data.token);
            }, (error) => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: "Erro ao registrar" });
            });
        }

        this.registerLoading = false;
    }

    public validateUser(){
        if(this.formulario.value.name != '' && this.formulario.value.email != '' && this.formulario.value.password != ''){
            if(this.validateEmail(this.formulario.value.email)){
                if(this.validatePassword(this.formulario.value.password)){
                    return true;
                }else{
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Senha precisa conter pelo menos 6 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 número' });
                    return false;
                }
            }else{
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Email inválido' });
                return false;
            }
        }else{
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos' });
            return false;
        }
    }

    public validateEmail(email: string){
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    public validatePassword(password: string){
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        return re.test(password);
    }

}
