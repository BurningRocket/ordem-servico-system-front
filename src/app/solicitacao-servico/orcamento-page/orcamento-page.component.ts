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
  selector: 'app-orcamento-page',
  templateUrl: './orcamento-page.component.html',
  styleUrls: ['./orcamento-page.component.scss']
})
export class OrcamentoPageComponent implements OnInit {

    deleteVisitaDialog: boolean = false;
    finalizaVisitaDialog: boolean = false;
    orcamentoDialog: boolean = false;
    aprovarDialog: boolean = false;
    reprovarDialog: boolean = false;

    cliente: ClienteDto = {};
    endereco: Endereco = {};
    orcamento: OrcamentoDto = {};

    orcamentos: OrcamentoDto[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private messageService: MessageService, private visitaService: VisitaService,
        private enderecoService: EnderecoService, private orcamentoService: OrcamentoService) { }

    ngOnInit() {
        this.orcamentoService.buscarTodos().subscribe((data: any) => {
            this.orcamentos = data;
            console.log(this.orcamentos);

        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar orcamentos', life: 3000 });
        });

        this.cols = [
            { field: '_id', header: 'ID' },
            { field: 'cliente.nome', header: 'Nome' },
            { field: 'cliente.telefone', header: 'Telefone' },
            { field: 'cliente.endereco', header: 'Endereço' },
            { field: 'visita.dataVisita', header: 'Data' },
            { field: 'visita.descricao', header: 'Descrição'},
            { field: 'status', header: 'Status' },
            { field: 'valor', header: 'Valor' },
        ];
    }

    aprovarOrcamento(orcamento: OrcamentoDto) {
        this.orcamento = orcamento;
        this.aprovarDialog = true;
    }

    confirmAprovarOrcamento() {
        this.orcamentoService.aprovarOrcamento(this.orcamento).subscribe((data: any) => {
            this.orcamento = data;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Visita Finalizada', life: 3000 });
            this.finalizaVisitaDialog = false;
            window.location.reload();
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao finalizar visita', life: 3000 });
        });
    }

    reprovarOrcamento(orcamento: OrcamentoDto) {
        this.orcamento = orcamento;
        this.reprovarDialog = true;
    }

    confirrmReprovarOrcamento() {
        this.orcamentoService.reprovarOrcamento(this.orcamento).subscribe((data: any) => {
            this.orcamento = data;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Visita Finalizada', life: 3000 });
            this.finalizaVisitaDialog = false;
            window.location.reload();
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao finalizar visita', life: 3000 });
        });
    }

    viewOrcamento(orcamento: OrcamentoDto) {
        this.orcamento = orcamento;
        this.cliente = orcamento.cliente ? orcamento.cliente : {};
        if(this.orcamento.visita?.endereco)
            this.populateEndereco(this.orcamento.visita?.endereco);
        this.orcamentoDialog = true;
    }

    onMarcarVisita(orcamento: OrcamentoDto) {
        this.orcamento = orcamento;
        this.cliente = orcamento.cliente ? orcamento.cliente : {};
        if(this.orcamento.endereco)
            this.populateEndereco(this.orcamento.endereco);
        this.finalizaVisitaDialog = true;
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
