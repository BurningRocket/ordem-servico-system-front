import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { UsersPageComponent } from './users-page/users-page.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            component: UsersPageComponent,
            canActivate: [AuthGuard],
            data: { role: ["ROOT"] }
        },
    ])],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
