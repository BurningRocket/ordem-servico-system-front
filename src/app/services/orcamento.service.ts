import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseAdminService } from '../layout/base/base-admin.service';
import { OrcamentoDto } from '../models/orcamento-dto';

@Injectable({
    providedIn: 'root'
})

export class OrcamentoService extends BaseAdminService {

    constructor(public override http: HttpClient) {
        super(http, "/orcamento");
    }

    buscarTodos() {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.get(this.actionUrl + "/findAll", options);
    }

    buscarTodosAbertos() {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.get(this.actionUrl + "/findAllOpen", options);
    }

    createOrcamento(orcamentoDto: OrcamentoDto) {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.post(this.actionUrl + "/create", orcamentoDto, options);
    }

    aprovarOrcamento(orcamentoDto: OrcamentoDto) {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.put(this.actionUrl + "/aprovar", orcamentoDto, options);
    }

    reprovarOrcamento(orcamentoDto: OrcamentoDto) {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.put(this.actionUrl + "/reprovar", orcamentoDto, options);
    }

}
