import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseAdminService } from '../layout/base/base-admin.service';
import { ClienteDto } from '../models/cliente-dto.model';

@Injectable({
    providedIn: 'root'
})

export class DashboardService extends BaseAdminService {

    constructor(public override http: HttpClient) {
        super(http, "/dashboard");
    }

    buscarDashboard() {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.get(this.actionUrl + "/getDashboard", options);
    }

}
