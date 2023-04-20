import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { ClientePageComponent } from './cliente-page/cliente-page.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'cliente',
            component: ClientePageComponent,
            canActivate: [AuthGuard],
            // data: { role: ["admin"] }
        },
    ])],
    exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
