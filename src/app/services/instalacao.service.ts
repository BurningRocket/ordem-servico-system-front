import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseAdminService } from '../layout/base/base-admin.service';
import { OrcamentoDto } from '../models/orcamento-dto';
import { InstalacaoDto } from '../models/instalacao-dto.model';

@Injectable({
    providedIn: 'root'
})

export class InstalacaoService extends BaseAdminService {

    constructor(public override http: HttpClient) {
        super(http, "/instalacao");
    }

    buscarTodos() {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.get(this.actionUrl + "/findAll", options);
    }

    createInstalacao(instalacaoDto: InstalacaoDto) {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.post(this.actionUrl + "/create", instalacaoDto, options);
    }

    finalizarInstalacao(instalacaoDto: InstalacaoDto) {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.put(this.actionUrl + "/aprovar", instalacaoDto, options);
    }

    faturarInstalacao(instalacaoDto: InstalacaoDto) {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.put(this.actionUrl + "/reprovar", instalacaoDto, options);
    }

}
