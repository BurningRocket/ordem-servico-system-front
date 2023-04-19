import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TipoAtividadeDto } from 'src/app/models/tipo-atividade-dto.model';
import { AtividadeDto } from '../../models/atividade-dto.model';
import { AtividadeService } from '../../services/atividade.service';
import { TipoAtividadeService } from 'src/app/services/tipo-atividade.service';

@Component({
  selector: 'app-visita-page',
  templateUrl: './visita-page.component.html',
  styleUrls: ['./visita-page.component.scss'],
  providers: [MessageService]
})
export class VisitaPageComponent implements OnInit {

    atividadeDialog: boolean = false;

    deleteAtividadeDialog: boolean = false;
    tipoAtividadeDialog: boolean = false;

    atividade: AtividadeDto = {};
    tipoAtividade: TipoAtividadeDto = {};

    atividades: AtividadeDto[] = [];
    tipoAtividades: TipoAtividadeDto[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private messageService: MessageService, private atividadeService: AtividadeService,
        private tipoAtividadeService:TipoAtividadeService) { }

    ngOnInit() {
        this.atividadeService.buscarTodos().subscribe(({data}: any) => {
            this.atividades = data;
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar atividades', life: 3000 });
        });

        this.tipoAtividadeService.buscarTodos().subscribe(({data}: any) => {
            this.tipoAtividades = data;
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar tipos de atividades', life: 3000 });
        });

        this.cols = [
            { field: 'nome', header: 'Nome' },
            { field: 'valor', header: 'Valor' },
        ];
    }

    openNewAtividade() {
        this.atividade = {};
        this.submitted = false;
        this.atividadeDialog = true;
    }

    deleteAtividade(atividade: AtividadeDto) {
        this.deleteAtividadeDialog = true;
        this.atividade = { ...atividade };
    }

    confirmDeleteAtividade() {
        this.deleteAtividadeDialog = false;

        this.atividadeService.deleteAtividade(this.atividade).subscribe(({data}: any) => {
            this.atividades = this.atividades.filter((val: any) => val.id !== this.atividade.id);
            this.atividade = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Atividade Deletada', life: 3000 });
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar atividade', life: 3000 });
        });

        this.atividades = [...this.atividades];
    }

    hideDialog() {
        this.atividadeDialog = false;
        this.tipoAtividadeDialog = false;
        this.submitted = false;
    }

    saveAtividade() {
        this.submitted = true;

        if(this.atividade.tipoAtividade && this.atividade.nome && this.atividade.valorReferencia){
            if (this.atividade.id === undefined) {
                this.atividadeService.createAtividade(this.atividade).subscribe(({data}: any) => {
                    this.atividade = data;
                    this.atividades.push(this.atividade);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Atividade Criada', life: 3000 });
                }, error => {
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar atividade', life: 3000 });
                });
            }else{
                this.atividadeService.updateAtividade(this.atividade).subscribe(({data}: any) => {
                    this.atividade = data;
                    this.atividades[this.atividades.findIndex((e: any) => e.id === this.atividade.id)] = this.atividade;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Atividade Atualizada', life: 3000 });
                }, error => {
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar atividade', life: 3000 });
                });
            }

            this.atividades = [...this.atividades];
            this.atividadeDialog = false;
            this.atividade = {};
        }
    }

    createTipoAtividade() {
        this.tipoAtividade = {};
        this.submitted = false;
        this.tipoAtividadeDialog = true;
    }

    saveTipoAtividade() {
        this.submitted = true;

        if (this.tipoAtividade.descricao) {
            this.tipoAtividadeService.createTipoAtividade(this.tipoAtividade).subscribe(({ data }: any) => {
                this.tipoAtividade = data;
                this.tipoAtividades.push(this.tipoAtividade);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tipo Atividade Criada', life: 3000 });
            }, error => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar tipo atividade', life: 3000 });
            });

            this.tipoAtividades = [...this.tipoAtividades];
            this.tipoAtividadeDialog = false;
            this.tipoAtividade = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

}
