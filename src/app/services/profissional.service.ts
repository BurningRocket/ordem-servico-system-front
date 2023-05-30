import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseAdminService } from '../layout/base/base-admin.service';
import { VisitaDto } from '../models/visita-dto.model';
import { ProfissionalDto } from '../models/profissional-dto';

@Injectable({
    providedIn: 'root'
})

export class ProfissionalService extends BaseAdminService {

    constructor(public override http: HttpClient) {
        super(http, "/profissional");
    }

    buscarTodos() {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.get(this.actionUrl + "/findAll", options);
    }

    createProfissional(visitaDto: ProfissionalDto) {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.post(this.actionUrl + "/create", visitaDto, options);
    }

}
