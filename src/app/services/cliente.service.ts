import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseAdminService } from '../layout/base/base-admin.service';
import { ClienteDto } from '../models/cliente-dto.model';

@Injectable({
    providedIn: 'root'
})

export class ClienteService extends BaseAdminService {

    constructor(public override http: HttpClient) {
        super(http, "/cliente");
    }

    buscarTodos() {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.get(this.actionUrl + "/findAll", options);
    }

}
