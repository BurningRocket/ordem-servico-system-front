import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { VisitaService } from '../../services/visita.service';
import { VisitaDto } from 'src/app/models/visita-dto.model';
import { ClienteDto } from 'src/app/models/cliente-dto.model';
import { Endereco } from 'src/app/models/endereco.model';
import { EnderecoService } from 'src/app/services/endereco.service';

@Component({
  selector: 'app-visita-page',
  templateUrl: './visita-page.component.html',
  styleUrls: ['./visita-page.component.scss'],
  providers: [MessageService]
})
export class VisitaPageComponent implements OnInit {

    visitaDialog: boolean = false;

    deleteVisitaDialog: boolean = false;
    finalizaVisitaDialog: boolean = false;

    visitaViewMode: boolean = false;

    visita: VisitaDto = {};
    cliente: ClienteDto = {};
    endereco: Endereco = {};

    visitas: VisitaDto[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private messageService: MessageService, private visitaService: VisitaService,
        private enderecoService: EnderecoService) { }

    ngOnInit() {
        this.visitaService.buscarTodos().subscribe((data: any) => {
            this.visitas = data;
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar visitas', life: 3000 });
        });

        this.cols = [
            { field: '_id', header: 'ID' },
            { field: 'cliente.nome', header: 'Nome' },
            { field: 'cliente.telefone', header: 'Telefone' },
            { field: 'cliente.endereco', header: 'Endereço' },
            { field: 'dataVisita', header: 'Data' },
            { field: 'descricao', header: 'Descrição'},
            { field: 'chegouSite' , header: 'Chegou pelo Site' },
            { field: 'notificarWpp' , header: 'Notificar Wpp' },
        ];
    }

    openNewVisita() {
        this.visita = {};
        this.cliente = {};
        this.endereco = {};
        this.submitted = false;
        this.visitaDialog = true;
        this.visitaViewMode = false;
    }

    saveVisita() {
        this.submitted = true;

        this.visita.cliente = this.cliente;
        this.visita.endereco = this.endereco.rua + ',' + this.endereco.numero + ',' + this.endereco.bairro + ',' + this.endereco.cidade + ',' + this.endereco.uf + ',' + this.endereco.cep;
        this.visita.cliente.endereco = this.visita.endereco;

        this.visitaService.createVisita(this.visita).subscribe((data: any) => {
            this.visita = data;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Visita Criada', life: 3000 });
            this.visitaDialog = false;
            window.location.reload();
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar visita', life: 3000 });
        });
    }

    finalizarVisita(visita: VisitaDto) {
        this.visita = visita;
        this.finalizaVisitaDialog = true;
    }

    confirmFinalizarVisita() {
        this.visitaService.finalizarVisita(this.visita).subscribe((data: any) => {
            this.visita = data;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Visita Finalizada', life: 3000 });
            this.finalizaVisitaDialog = false;
            window.location.reload();
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao finalizar visita', life: 3000 });
        });
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
        this.submitted = false;
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onCepSelected() {

        if(!this.endereco.cep || this.endereco.cep?.length < 8){
          return;
        }

        this.enderecoService.getEndereco(this.endereco.cep).subscribe((res:any)=> {
          if(res.erro){
            this.messageService.add({severity:'error', summary:'Erro', detail:'CEP não encontrado'});
            return;
          }else{
            this.endereco.rua = res.logradouro;
            this.endereco.bairro = res.bairro;
            this.endereco.cidade = res.localidade;
            this.endereco.uf = res.uf;
          }
        });
    }

}
