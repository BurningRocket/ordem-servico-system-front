import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserDto } from 'src/app/models/user-dto.model';
import { AuthService } from 'src/app/seguranca/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

    user: UserDto = {};

    users: UserDto[] = [];

    confirmPassword?: string;

    rowsPerPageOptions = [5, 10, 20];

    userLoading: boolean = false;
    creatingUserLoading: boolean = false;

    newUserDialog: boolean = false;
    submmit: boolean = false;

    constructor(private messageService: MessageService, private userService: UserService,
        private authService: AuthService) { }

    ngOnInit() {
        this.userLoading = true;

        this.userService.buscarTodos().subscribe((data: any) => {
            this.users = data;
            this.userLoading = false;
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar Usuários', life: 3000 });
            this.userLoading = false;
        });
    }

    newUser(){
        this.newUserDialog = true;
        this.user = {};
        this.submmit = false;
    }

    checkPassword(){
        if(this.user.password != this.confirmPassword){
            return false;
        }
        return true;
    }

    confirmNewUser(){
        this.submmit = true;
        if(this.user.name && this.user.email && this.user.role && this.user.password && this.confirmPassword && this.checkPassword()){
            this.creatingUserLoading = true;

            const loginDTO = {
                name: this.user.name,
                email: this.user.email,
                password: this.user.password,
                role: this.user.role
            }

            this.authService.register(loginDTO).subscribe((data: any) => {
                this.users.push(data);
                this.newUserDialog = false;
                this.creatingUserLoading = false;
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário criado com sucesso', life: 3000 });
            }, error => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar Usuário', life: 3000 });
                this.creatingUserLoading = false;
            });
        }else{
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos!', life: 3000 });

        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
