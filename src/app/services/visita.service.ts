import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseAdminService } from '../layout/base/base-admin.service';
import { VisitaDto } from '../models/visita-dto.model';

@Injectable({
    providedIn: 'root'
})

export class VisitaService extends BaseAdminService {

    constructor(public override http: HttpClient) {
        super(http, "/visita");
    }

    buscarTodos() {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.get(this.actionUrl + "/", options);
    }

    createVisita(visitaDto: VisitaDto) {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.post(this.actionUrl + "/", visitaDto, options);
    }

    buscarTodosAbertos() {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.get(this.actionUrl + "/findAllOpen", options);
    }

    finalizarVisita(visitaDto: VisitaDto) {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.put(this.actionUrl + "/finalizar", visitaDto, options);
    }

}
