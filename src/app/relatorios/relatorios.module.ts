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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { ClientePageComponent } from './cliente-page/cliente-page.component';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { VisitaPageRelatorioComponent } from './visita-page-relatorio/visita-page-relatorio.component';
import { OrcamentoPageRelatorioComponent } from './orcamento-page-relatorio/orcamento-page-relatorio.component';
import { InstalacaoPageRelatorioComponent } from './instalacao-page-relatorio/instalacao-page-relatorio.component';
@NgModule({
    declarations: [ClientePageComponent, VisitaPageRelatorioComponent, OrcamentoPageRelatorioComponent, InstalacaoPageRelatorioComponent],
    imports: [
        CommonModule,
        RelatoriosRoutingModule,
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
        InputMaskModule
    ]
})
export class RelatoriosModule { }
