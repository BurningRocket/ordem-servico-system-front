import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../seguranca/auth.guard';
import { LayoutService } from './service/app.layout.service';

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
                        hasPermission: true,
                        // hasPermission: this.authService.hasRoles(["admin"]),
                    },

                ],
                hasPermission: true,
                // hasPermission: this.authService.hasRoles(["admin"]),
            },
        ];
    }
}
