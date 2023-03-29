import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AtividadePageComponent } from './atividade-page/atividade-page.component';
import { AuthGuard } from '../seguranca/auth.guard';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'atividade',
            component: AtividadePageComponent,
            canActivate: [AuthGuard],
            // data: { role: ["admin"] }
        },
    ])],
    exports: [RouterModule]
})
export class SolicitacaoServicoRoutingModule { }
