import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../seguranca/auth.guard';
import { LayoutService } from './service/app.layout.service';
import { RolesEnum } from '../models/roles-enum';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService, public authService: AuthGuard) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Solicitações de Serviço',
                items: [
                    {
                        label: 'Atividade',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/solicitacao-servico/atividade'],
                        hasPermission: this.authService.hasRoles([RolesEnum.ADMIN]),
                    },

                ],
                hasPermission: this.authService.hasRoles([RolesEnum.ADMIN, RolesEnum.INSTALADOR]),
            },
        ];
    }
}
