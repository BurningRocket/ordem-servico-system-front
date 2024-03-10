import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './seguranca/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    canActivate: [AuthGuard],
                    children: [
                        {
                            path: '',
                            loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'solicitacao-servico',
                            loadChildren: () => import('./solicitacao-servico/solicitacao-servico.module').then((m) => m.SolicitacaoServicoModule),
                            canActivate: [AuthGuard],
                            // data: { roles: ["ADMIN"]
                        },
                        {
                            path: 'relatorios',
                            loadChildren: () => import('./relatorios/relatorios.module').then((m) => m.RelatoriosModule),
                            canActivate: [AuthGuard],
                            // data: { roles: ["ADMIN"]
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./seguranca/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
            ]
        ),
    ],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class AppRoutingModule { }
