import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthDirective } from './auth-directive/auth.directive';

@NgModule({
  declarations: [AuthDirective],
  imports: [
    CommonModule,
  ],
  exports: [AuthDirective]
})
export class SharedModule { }
