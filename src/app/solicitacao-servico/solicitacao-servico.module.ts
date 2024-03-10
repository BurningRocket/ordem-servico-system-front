import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { SolicitacaoServicoRoutingModule } from './solicitacao-servico-routing.module';
import { VisitaPageComponent } from './visita-page/visita-page.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { OrcamentoPageComponent } from './orcamento-page/orcamento-page.component';
import { InstalacaoPageComponent } from './instalacao-page/instalacao-page.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { ProfissionalPageComponent } from './profissional-page/profissional-page.component';
@NgModule({
    declarations: [VisitaPageComponent, OrcamentoPageComponent, InstalacaoPageComponent, ProfissionalPageComponent],
    imports: [
        CommonModule,
        SolicitacaoServicoRoutingModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        ProgressSpinnerModule,
        CalendarModule,
        TooltipModule,
        SharedModule,
        MultiSelectModule,
        AutoCompleteModule,
        CheckboxModule,
        InputMaskModule,
        TooltipModule,
        AutoCompleteModule
    ]
})
export class SolicitacaoServicoModule { }
