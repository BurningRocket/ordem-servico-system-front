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
import { InstalacaoDto } from 'src/app/models/instalacao-dto.model';
import { InstalacaoService } from 'src/app/services/instalacao.service';
import { ProfissionalDto } from 'src/app/models/profissional-dto';
import { ProfissionalService } from 'src/app/services/profissional.service';
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
    instalacaoDialog: boolean = false;

    instalacao: InstalacaoDto = {};
    cliente: ClienteDto = {};
    endereco: Endereco = {};
    orcamento: OrcamentoDto = {};

    orcamentos: OrcamentoDto[] = [];
    profissionais: ProfissionalDto[] = [];

    submitted: boolean = false;

    buscarOrcamentoLoading: boolean = false;
    buscarInstalacaoLoading: boolean = false;
    orcamentoLoading: boolean = false;
    instalacaoLoading: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private messageService: MessageService, private visitaService: VisitaService,
        private enderecoService: EnderecoService, private orcamentoService: OrcamentoService,
        private instalacaoService: InstalacaoService, private profissionalService: ProfissionalService) { }

    ngOnInit() {

        this.buscarOrcamentoLoading = true;
        this.buscarInstalacaoLoading = true;

        this.orcamentoService.buscarTodosAbertos().subscribe((data: any) => {
            this.orcamentos = data;
            this.buscarOrcamentoLoading = false;
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar orcamentos', life: 3000 });
            this.buscarOrcamentoLoading = false;
        });

        this.profissionalService.buscarInstaladores().subscribe((data: any) => {
            this.profissionais = data;
            this.buscarInstalacaoLoading = false;
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar profissionais', life: 3000 });
            this.buscarInstalacaoLoading = false;
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
        this.orcamentoLoading = true;
        this.orcamentoService.aprovarOrcamento(this.orcamento).subscribe((data: any) => {
            this.orcamento = data;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Visita Finalizada', life: 3000 });
            this.finalizaVisitaDialog = false;
            this.orcamentoLoading = false;
            window.location.reload();
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao finalizar visita', life: 3000 });
            this.orcamentoLoading = false;
        });
    }

    reprovarOrcamento(orcamento: OrcamentoDto) {
        this.orcamento = orcamento;
        this.reprovarDialog = true;
    }

    confirrmReprovarOrcamento() {
        this.orcamentoLoading = true;
        this.orcamentoService.reprovarOrcamento(this.orcamento).subscribe((data: any) => {
            this.orcamento = data;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Visita Finalizada', life: 3000 });
            this.finalizaVisitaDialog = false;
            this.orcamentoLoading = false;
            window.location.reload();
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao finalizar visita', life: 3000 });
            this.orcamentoLoading = false;
        });
    }

    viewOrcamento(orcamento: OrcamentoDto) {
        this.orcamento = orcamento;
        this.cliente = orcamento.cliente ? orcamento.cliente : {};
        if(this.orcamento.visita?.endereco)
            this.populateEndereco(this.orcamento.visita?.endereco);
        this.orcamentoDialog = true;
    }

    onMarcarInstalacao(orcamento: OrcamentoDto) {
        this.orcamento = orcamento;
        this.cliente = orcamento.cliente ? orcamento.cliente : {};
        if(this.orcamento.visita?.endereco)
            this.populateEndereco(this.orcamento.visita?.endereco);
        this.instalacaoDialog = true;
    }

    saveInstalacao() {
        this.instalacao.orcamento = this.orcamento;
        this.instalacao.cliente = this.cliente;
        this.instalacao.endereco = this.endereco.rua + ',' + this.endereco.numero + ',' + this.endereco.bairro + ',' + this.endereco.cidade + ',' + this.endereco.uf + ',' + this.endereco.cep;

        this.instalacaoLoading = true;

        if(this.instalacao.dataInstalacao && this.instalacao.profissional){
            this.instalacaoService.createInstalacao(this.instalacao).subscribe((data: any) => {
                this.instalacao = data;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Instalação marcada com sucesso', life: 3000 });
                this.instalacaoDialog = false;
                this.instalacaoLoading = false;
                window.location.reload();
            }, error => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao marcar instalação', life: 3000 });
                this.instalacaoLoading = false;
            });
        }else{
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos obrigatórios', life: 3000 });
            this.instalacaoLoading = false;
        }
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
