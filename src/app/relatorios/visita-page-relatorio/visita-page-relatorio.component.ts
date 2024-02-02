import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { VisitaService } from '../../services/visita.service';
import { VisitaDto } from 'src/app/models/visita-dto.model';
import { ClienteDto } from 'src/app/models/cliente-dto.model';
import { Endereco } from 'src/app/models/endereco.model';
import { EnderecoService } from 'src/app/services/endereco.service';
import { OrcamentoDto } from 'src/app/models/orcamento-dto';
import { OrcamentoService } from 'src/app/services/orcamento.service';

@Component({
  selector: 'app-visita-page-relatorio',
  templateUrl: './visita-page-relatorio.component.html',
  styleUrls: ['./visita-page-relatorio.component.scss']
})
export class VisitaPageRelatorioComponent implements OnInit {


    visitaDialog: boolean = false;

    deleteVisitaDialog: boolean = false;
    finalizaVisitaDialog: boolean = false;
    orcamentoDialog: boolean = false;

    visitaViewMode: boolean = false;

    visita: VisitaDto = {};
    cliente: ClienteDto = {};
    endereco: Endereco = {};
    orcamento: OrcamentoDto = {};

    visitas: VisitaDto[] = [];

    submitted: boolean = false;

    buscarVisitaLoading: boolean = false;
    visitaLoading: boolean = false;
    orcamentoLoading: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private messageService: MessageService, private visitaService: VisitaService,
        private enderecoService: EnderecoService, private orcamentoService: OrcamentoService) { }

    ngOnInit() {
        this.visitaService.buscarTodos().subscribe((data: any) => {
            this.visitas = data;
            this.buscarVisitaLoading = false;
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar visitas', life: 3000 });
            this.buscarVisitaLoading = false;
        });

        this.cols = [
            { field: '_id', header: 'ID' },
            { field: 'cliente.nome', header: 'Nome' },
            { field: 'cliente.telefone', header: 'Telefone' },
            { field: 'cliente.endereco', header: 'Endereço' },
            { field: 'dataVisita', header: 'Data' },
            { field: 'descricao', header: 'Descrição'},
            { field: 'formaContato' , header: 'Forma de contato' },
            { field: 'notificarWpp' , header: 'Notificar Wpp' },
        ];
    }

    viewVisita(visita: VisitaDto) {
        this.visita = visita;
        this.cliente = visita.cliente ? visita.cliente : {};
        if(this.visita.endereco)
            this.populateEndereco(this.visita.endereco);
        this.visitaDialog = true;
        this.visitaViewMode = true;
    }

    populateEndereco(enderecoString: string) {
        let enderecoArray = enderecoString.split(',');
        this.endereco.rua = enderecoArray[0];
        this.endereco.numero = enderecoArray[1];
        this.endereco.bairro = enderecoArray[2];
        this.endereco.cidade = enderecoArray[3];
        this.endereco.uf = enderecoArray[4];
        this.endereco.cep = enderecoArray[5];
    }

    hideDialog() {
        this.visitaDialog = false;
        this.orcamentoDialog = false;
        this.submitted = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

}
