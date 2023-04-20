import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
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
                            path: 'solicitacao-servico',
                            loadChildren: () => import('./solicitacao-servico/solicitacao-servico.module').then((m) => m.SolicitacaoServicoModule),
                            canActivate: [AuthGuard],
                            // data: { roles: ["admin"]
                        },
                        {
                            path: '',
                            loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule),
                            canActivate: [AuthGuard],
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

                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ]
        ),
    ],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class AppRoutingModule { }
