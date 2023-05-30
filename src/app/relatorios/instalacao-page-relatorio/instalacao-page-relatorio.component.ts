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
@Component({
  selector: 'app-instalacao-page-relatorio',
  templateUrl: './instalacao-page-relatorio.component.html',
  styleUrls: ['./instalacao-page-relatorio.component.scss']
})
export class InstalacaoPageRelatorioComponent implements OnInit {

    deleteVisitaDialog: boolean = false;
    finalizaVisitaDialog: boolean = false;
    aprovarDialog: boolean = false;
    reprovarDialog: boolean = false;
    instalacaoDialog: boolean = false;
    finalizarInstalacaoDialog: boolean = false;
    pagamentoDialog: boolean = false;

    instalacao: InstalacaoDto = {};
    cliente: ClienteDto = {};
    endereco: Endereco = {};
    orcamento: OrcamentoDto = {};

    instalacoes: InstalacaoDto[] = [];

    submitted: boolean = false;

    instalacaoLoading: boolean = false;

    dataInstalacaoFormatada: string = "";

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private messageService: MessageService, private visitaService: VisitaService,
        private enderecoService: EnderecoService, private orcamentoService: OrcamentoService,
        private instalacaoService: InstalacaoService) { }

    ngOnInit() {
        this.instalacaoService.buscarTodos().subscribe((data: any) => {
            this.instalacoes = data;
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar instalações', life: 3000 });
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

    viewInstalacao(instalacao: InstalacaoDto) {
        this.instalacao = {...instalacao};
        this.dataInstalacaoFormatada = this.instalacao.dataInstalacao ? new Date(this.instalacao.dataInstalacao[0]).toLocaleDateString() + " " +  new Date(this.instalacao.dataInstalacao[0]).toLocaleTimeString() + ' - ' + new Date(this.instalacao.dataInstalacao[1]).toLocaleDateString() + " " +  new Date(this.instalacao.dataInstalacao[1]).toLocaleTimeString() : '';
        this.cliente = instalacao.cliente ? instalacao.cliente : {};
        if(this.instalacao.endereco)
            this.populateEndereco(this.instalacao.endereco);
        this.instalacaoDialog = true;
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
