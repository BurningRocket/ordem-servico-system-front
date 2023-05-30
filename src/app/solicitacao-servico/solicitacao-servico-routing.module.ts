import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VisitaPageComponent } from './visita-page/visita-page.component';
import { AuthGuard } from '../seguranca/auth.guard';
import { OrcamentoPageComponent } from './orcamento-page/orcamento-page.component';
import { InstalacaoPageComponent } from './instalacao-page/instalacao-page.component';
import { ProfissionalPageComponent } from './profissional-page/profissional-page.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'visita',
            component: VisitaPageComponent,
            canActivate: [AuthGuard],
            // data: { role: ["admin"] }
        },
        {
            path: 'orcamento',
            component: OrcamentoPageComponent,
            canActivate: [AuthGuard],
            // data: { role: ["admin"] }
        },
        {
            path: 'instalacao',
            component: InstalacaoPageComponent,
            canActivate: [AuthGuard],
            // data: { role: ["admin"] }
        },
        {
            path: 'profissional',
            component: ProfissionalPageComponent,
            canActivate: [AuthGuard],
            // data: { role: ["admin"] }
        }
    ])],
    exports: [RouterModule]
})
export class SolicitacaoServicoRoutingModule { }
