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
                label: 'Home',
                items: [
                    {
                        label: 'Visão geral',
                        icon: 'pi pi-fw pi-chart-bar',
                        routerLink: ['/'],
                        hasPermission: true,
                    }
                ],
                hasPermission: true,
            },
            {
                label: 'Fluxo de serviço',
                items: [
                    {
                        label: 'Visita',
                        icon: 'pi pi-fw pi-car',
                        routerLink: ['/#!/solicitacao-servico/visita'],
                        hasPermission: true,
                        // hasPermission: this.authService.hasRoles(["ADMIN"]),
                    },
                    {
                        label: 'Orçamento',
                        icon: 'pi pi-fw pi-dollar',
                        routerLink: ['/#!/solicitacao-servico/orcamento'],
                        hasPermission: true,
                        // hasPermission: this.authService.hasRoles(["ADMIN"]),
                    },
                    {
                        label: 'Instalação',
                        icon: 'pi pi-fw pi-map-marker',
                        routerLink: ['/#!/solicitacao-servico/instalacao'],
                        hasPermission: true,
                        // hasPermission: this.authService.hasRoles(["ADMIN"]),
                    },
                    {
                        label: 'Profissional',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/#!/solicitacao-servico/profissional'],
                        hasPermission: true,
                        // hasPermission: this.authService.hasRoles(["ADMIN"]),
                    },

                ],
                hasPermission: true,
                // hasPermission: this.authService.hasRoles(["ADMIN"]),
            },
            {
                label: 'Relatório',
                items: [
                    {
                        label: 'Cliente',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/#!/relatorios/cliente'],
                        hasPermission: true,
                        // hasPermission: this.authService.hasRoles(["ADMIN"]),
                    },
                    {
                        label: 'Visita',
                        icon: 'pi pi-fw pi-car',
                        routerLink: ['/#!/relatorios/visita'],
                        hasPermission: true,
                        // hasPermission: this.authService.hasRoles(["ADMIN"]),
                    },
                    {
                        label: 'Orçamento',
                        icon: 'pi pi-fw pi-dollar',
                        routerLink: ['/#!/relatorios/orcamento'],
                        hasPermission: true,
                        // hasPermission: this.authService.hasRoles(["ADMIN"]),
                    },
                    {
                        label: 'Instalação',
                        icon: 'pi pi-fw pi-map-marker',
                        routerLink: ['/#!/relatorios/instalacao'],
                        hasPermission: true,
                        // hasPermission: this.authService.hasRoles(["ADMIN"]),
                    },
                ],
                hasPermission: true,
                // hasPermission: this.authService.hasRoles(["ADMIN"]),
            },
            {
                label: 'Gestão de usuários',
                items: [
                    {
                        label: 'Usuários',
                        icon: 'pi pi-fw pi-key',
                        routerLink: ['/#!/users'],
                        hasPermission: this.authService.hasRoles(["ROOT"]),
                    },
                ],
                hasPermission: this.authService.hasRoles(["ROOT"]),
            },
        ];
    }
}
