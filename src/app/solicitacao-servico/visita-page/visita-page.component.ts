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

    //TODO: false
    visitaDialog: boolean = true;

    deleteVisitaDialog: boolean = false;

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
        this.visitaService.buscarTodos().subscribe(({data}: any) => {
            this.visitas = data;
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar visitas', life: 3000 });
        });

        this.cols = [
            { field: 'nome', header: 'Nome' },
            { field: 'valor', header: 'Valor' },
        ];
    }

    openNewVisita() {
        this.visita = {};
        this.submitted = false;
        this.visitaDialog = true;
    }

    deleteVisita(visita: VisitaDto) {
        this.deleteVisitaDialog = true;
        this.visita = { ...visita };
    }

    confirmDeleteVisita() {
        // this.deleteVisitaDialog = false;

        // this.visitaService.deleteVisita(this.visita).subscribe(({data}: any) => {
        //     this.visitas = this.visitas.filter((val: any) => val.id !== this.visita.id);
        //     this.visita = {};
        //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Visita Deletada', life: 3000 });
        // }, error => {
        //     this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar visita', life: 3000 });
        // });

        // this.visitas = [...this.visitas];
    }

    hideDialog() {
        this.visitaDialog = false;
        this.submitted = false;
    }

    saveVisita() {
        this.submitted = true;

        this.visita.cliente = this.cliente;
        this.visita.endereco = this.endereco.rua + ',' + this.endereco.numero + ',' + this.endereco.bairro + ',' + this.endereco.cidade + ',' + this.endereco.uf + ',' + this.endereco.cep;
        this.visita.cliente.endereco = this.visita.endereco;

        this.visitaService.createVisita(this.visita).subscribe(({data}: any) => {
            this.visita = data;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Visita Criada', life: 3000 });
            this.visitaDialog = false;
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar visita', life: 3000 });
        });
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
