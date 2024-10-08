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
import { ProfissionalService } from 'src/app/services/profissional.service';
import { ProfissionalDto } from 'src/app/models/profissional-dto';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

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
    orcamentoDialog: boolean = false;

    visitaViewMode: boolean = false;

    visita: VisitaDto = {};
    cliente: ClienteDto = {};
    endereco: Endereco = {};
    orcamento: OrcamentoDto = {};

    visitas: VisitaDto[] = [];
    profissionais: ProfissionalDto[] = [];
    clientes: ClienteDto[] = [];
    nomeClientes: string[] = [];

    nomeClientesFiltered: string[] = [];

    submitted: boolean = false;

    buscarVisitaLoading: boolean = false;
    buscarProfissionaisLoading: boolean = false;
    buscarClientesLoading: boolean = false;
    visitaLoading: boolean = false;
    orcamentoLoading: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private messageService: MessageService, private visitaService: VisitaService,
        private enderecoService: EnderecoService, private orcamentoService: OrcamentoService,
        private profissionalService: ProfissionalService, private clienteService: ClienteService,
        private router: Router) { }

    ngOnInit() {
        this.buscarVisitaLoading = true;
        this.buscarProfissionaisLoading = true;
        this.buscarClientesLoading = true;

        this.visitaService.buscarTodosAbertos().subscribe((data: any) => {
            this.visitas = data;
            this.buscarVisitaLoading = false;
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar visitas', life: 3000 });
            this.buscarVisitaLoading = false;
        });

        this.profissionalService.buscarVistoriadores().subscribe((data: any) => {
            this.profissionais = data;
            this.buscarProfissionaisLoading = false;
            this.checkVistoriador();
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar profissionais', life: 3000 });
            this.buscarProfissionaisLoading = false;
        });

        this.clienteService.buscarTodos().subscribe((data: any) => {
            this.clientes = data;
            if(this.clientes.length > 0){
                this.nomeClientes = this.clientes.map((cliente: ClienteDto) => cliente.nome) as string[];
            }
            this.buscarClientesLoading = false;
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar clientes', life: 3000 });
            this.buscarClientesLoading = false;
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

    checkVistoriador(){
        if(this.profissionais.length < 1){
            this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Para agendar uma visita primeiro tenha algum vistoriador cadastrado!', life: 3000 });
        }
    }

    onClienteSelected(event: any) {
        const clienteSelected = this.clientes.find((cliente: ClienteDto) => cliente.nome === event) as ClienteDto;

        if(clienteSelected){
            this.cliente = {...clienteSelected};
            const enderecoCliente = clienteSelected.endereco as string;
            this.populateEndereco(enderecoCliente);
        }else{
            this.cliente = {};
            this.endereco = {};
        }
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
        this.visitaLoading = true;

        this.visita.cliente = this.cliente;
        this.visita.endereco = this.endereco.rua + ',' + this.endereco.numero + ',' + this.endereco.bairro + ',' + this.endereco.cidade + ',' + this.endereco.uf + ',' + this.endereco.cep;
        this.visita.cliente.endereco = this.visita.endereco;

        if(this.visita.cliente.cpf && this.visita.cliente.nome && this.visita.cliente.telefone && this.visita.endereco && this.visita.dataVisita && this.visita.profissional){
            if(!this.visita._id){
                this.visitaService.createVisita(this.visita).subscribe((data: any) => {
                    this.visita = data;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Visita Criada', life: 3000 });
                    this.visitaDialog = false;
                    this.visitaLoading = false;
                    window.location.reload();
                }, error => {
                    this.visitaLoading = false;
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar visita', life: 3000 });
                });
            }else{
                this.visitaService.updateVisita(this.visita).subscribe((data: any) => {
                    this.visita = data;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Visita Atualizada', life: 3000 });
                    this.visitaDialog = false;
                    this.visitaLoading = false;
                    window.location.reload();
                }, error => {
                    this.visitaLoading = false;
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar visita', life: 3000 });
                });
            }
        }else{
            this.visitaLoading = false;
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos obrigatórios', life: 3000 });
        }
    }

    deleteVisita(){
        this.visitaService.deleteVisita(this.visita._id).subscribe((data: any) => {
            this.visita = data;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Visita excluida', life: 3000 });
            this.visitaDialog = false;
            this.visitaLoading = false;
            window.location.reload();
        }, error => {
            this.visitaLoading = false;
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir visita', life: 3000 });
        });
    }

    validateEndereco(){
        if(this.endereco.rua && this.endereco.numero && this.endereco.bairro && this.endereco.cidade && this.endereco.uf && this.endereco.cep){
            return true;
        }

        return false;
    }

    finalizarVisita(visita: VisitaDto) {
        this.visita = visita;
        this.finalizaVisitaDialog = true;
    }

    confirmFinalizarVisita() {
        this.visitaLoading = true;
        this.visitaService.finalizarVisita(this.visita).subscribe((data: any) => {
            this.visita = data;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Visita Finalizada', life: 3000 });
            this.finalizaVisitaDialog = false;
            this.visitaLoading = false;
            window.location.reload();
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao finalizar visita', life: 3000 });
            this.visitaLoading = false;
        });
    }

    viewVisita(visita: VisitaDto) {
        this.visita = visita;
        this.visita.dataVisita = new Date(this.visita.dataVisita as string) as Date
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

    onNewOrcamento(visita: VisitaDto) {
        this.visita = visita;
        this.cliente = visita.cliente ? visita.cliente : {};
        if(this.visita.endereco)
            this.populateEndereco(this.visita.endereco);
        this.submitted = false;
        this.orcamentoDialog = true;
        this.visitaViewMode = false;
    }

    saveOrcamento(){
        if(!this.orcamento.valor){
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Informe o valor do orçamento', life: 3000 });
            return;
        }

        this.submitted = true;
        this.orcamentoLoading = true;
        this.orcamento.visita = this.visita;
        this.orcamento.cliente = this.cliente;
        this.orcamento.endereco = this.endereco.rua + ',' + this.endereco.numero + ',' + this.endereco.bairro + ',' + this.endereco.cidade + ',' + this.endereco.uf + ',' + this.endereco.cep;
        this.orcamento.cliente.endereco = this.orcamento.endereco;

        this.orcamentoService.createOrcamento(this.orcamento).subscribe((data: any) => {
            this.orcamento = data;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Orcamento Criado', life: 3000 });
            this.orcamentoDialog = false;
            this.orcamentoLoading = false;
            this.router.navigate(['/solicitacao-servico/orcamento']);
        }
        , error => {
            this.orcamentoLoading = false;
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar orcamento', life: 3000 });
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

    searchClientes(event: any) {
        this.nomeClientesFiltered = this.nomeClientes.filter((nomeCliente: string) => nomeCliente?.toLowerCase().includes(event.query.toLowerCase()));
    }
}
