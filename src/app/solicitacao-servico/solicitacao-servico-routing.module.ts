import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AtividadePageComponent } from './atividade-page/atividade-page.component';
import { AuthGuard } from '../seguranca/auth.guard';
import { RolesEnum } from '../models/roles-enum';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'atividade',
            component: AtividadePageComponent,
            canActivate: [AuthGuard],
            data: { roles: [RolesEnum.ADMIN] }
        },
    ])],
    exports: [RouterModule]
})
export class SolicitacaoServicoRoutingModule { }
