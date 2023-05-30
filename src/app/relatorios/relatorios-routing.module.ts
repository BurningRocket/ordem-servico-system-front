import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { ClientePageComponent } from './cliente-page/cliente-page.component';
import { VisitaPageRelatorioComponent } from './visita-page-relatorio/visita-page-relatorio.component';
import { OrcamentoPageRelatorioComponent } from './orcamento-page-relatorio/orcamento-page-relatorio.component';
import { InstalacaoPageRelatorioComponent } from './instalacao-page-relatorio/instalacao-page-relatorio.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'cliente',
            component: ClientePageComponent,
            canActivate: [AuthGuard],
            // data: { role: ["admin"] }
        },
        {
            path: 'visita',
            component: VisitaPageRelatorioComponent,
            canActivate: [AuthGuard],
            // data: { role: ["admin"] }
        },
        {
            path: 'orcamento',
            component: OrcamentoPageRelatorioComponent,
            canActivate: [AuthGuard],
            // data: { role: ["admin"] }
        },
        {
            path: 'instalacao',
            component: InstalacaoPageRelatorioComponent,
            canActivate: [AuthGuard],
            // data: { role: ["admin"] }
        },

    ])],
    exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
