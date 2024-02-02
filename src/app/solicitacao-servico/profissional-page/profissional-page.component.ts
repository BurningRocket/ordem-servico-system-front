import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProfissionalDto } from 'src/app/models/profissional-dto';
import { ProfissionalService } from 'src/app/services/profissional.service';

@Component({
  selector: 'app-profissional-page',
  templateUrl: './profissional-page.component.html',
  styleUrls: ['./profissional-page.component.scss']
})
export class ProfissionalPageComponent implements OnInit {

    profissionais: ProfissionalDto[] = [];

    profissional: ProfissionalDto = {};

    profissionalDialog: boolean = false;

    buscarProfissionalLoading: boolean = false;
    profissionalLoading: boolean = false;

    profissionalViewMode: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

  constructor(private profissionalService: ProfissionalService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.buscarProfissionalLoading = true;

    this.profissionalService.buscarTodos().subscribe((data: any) => {
        this.profissionais = data;
        this.buscarProfissionalLoading = false;
    }, error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar profissionais', life: 3000 });
        this.buscarProfissionalLoading = false;
    });
  }

  newProfissional(): void {
    this.profissional = {};
    this.submitted = false;
    this.profissionalDialog = true;
  }

  viewProfissional(profissional: ProfissionalDto): void {
    this.profissional = profissional;
    this.profissionalViewMode = true;
    this.profissionalDialog = true;
  }

  hideDialog(): void {
    this.submitted = false;
    this.profissionalDialog = false;
    }

    saveProfissional(): void {
        this.submitted = true;

        if((this.profissional.instalador || this.profissional.vistoriador) && this.profissional.nome){
            this.profissionalService.createProfissional(this.profissional).subscribe((data: any) => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Profissional cadastrado com sucesso', life: 3000 });
                this.profissionalDialog = false;
                this.profissional = {};
                window.location.reload();
            }, error => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar profissional', life: 3000 });
            });
        }else{
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos Obrigatórios', life: 3000 });
        }
    }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


}
