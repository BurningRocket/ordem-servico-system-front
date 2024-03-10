import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseAdminService } from '../layout/base/base-admin.service';

@Injectable({
    providedIn: 'root'
})

export class UserService extends BaseAdminService {

    constructor(public override http: HttpClient) {
        super(http, "/user");
    }

    buscarTodos() {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.get(this.actionUrl + "/findAll", options);
    }

}
