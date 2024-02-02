import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ClienteService } from '../../services/cliente.service';
import { ClienteDto } from 'src/app/models/cliente-dto.model';
import { EnderecoService } from 'src/app/services/endereco.service';

@Component({
  selector: 'app-cliente-page',
  templateUrl: './cliente-page.component.html',
  styleUrls: ['./cliente-page.component.scss'],
  providers: [MessageService]
})
export class ClientePageComponent implements OnInit {

    cliente: ClienteDto = {};

    clientes: ClienteDto[] = [];

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    clienteLoading: boolean = false;

    constructor(private messageService: MessageService, private clienteService: ClienteService) { }

    ngOnInit() {
        this.clienteLoading = true;

        this.clienteService.buscarTodos().subscribe((data: any) => {
            this.clientes = data;
            this.clienteLoading = false;
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar clientes', life: 3000 });
            this.clienteLoading = false;
        });

        this.cols = [
            { field: '_id', header: 'ID' },
            { field: 'cliente.nome', header: 'Nome' },
            { field: 'cliente.telefone', header: 'Telefone' },
            { field: 'cliente.endereco', header: 'Endereço' },
            { field: 'dataCliente', header: 'Data' },
            { field: 'descricao', header: 'Descrição'},
            { field: 'formaContato' , header: 'Forma de contato' },
            { field: 'notificarWpp' , header: 'Notificar Wpp' },
        ];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

}
