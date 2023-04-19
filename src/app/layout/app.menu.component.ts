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
                label: 'Fluxo de serviço',
                items: [
                    {
                        label: 'Visita',
                        icon: 'pi pi-fw pi-car',
                        routerLink: ['/solicitacao-servico/visita'],
                        hasPermission: true,
                        // hasPermission: this.authService.hasRoles(["admin"]),
                    },
                    {
                        label: 'Orçamento',
                        icon: 'pi pi-fw pi-dollar',
                        routerLink: ['/solicitacao-servico/orcamento'],
                        hasPermission: true,
                        // hasPermission: this.authService.hasRoles(["admin"]),
                    },
                    {
                        label: 'Instalação',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/solicitacao-servico/instalacao'],
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
