import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseAdminService } from '../layout/base/base-admin.service';
import { TipoAtividadeDto } from '../models/tipo-atividade-dto.model';

@Injectable({
    providedIn: 'root'
})

export class TipoAtividadeService extends BaseAdminService {

    constructor(public override http: HttpClient) {
        super(http, "/tipoAtividade");
    }

    /**
     *
     * @returns
     */
    buscarTodos() {

        let param = {
            token: "teste"
        }

        let options = { headers: this.getHttpHeaders() };

        return this.http.post(this.actionUrl + "/buscarTodos", param, options);
    }

    /**
  *
  * @param tipoAtividadeDto
  * @returns
  */
    createTipoAtividade(tipoAtividadeDto: TipoAtividadeDto) {

        let options = { headers: this.getHttpHeaders() };

        return this.http.post(this.actionUrl + "/createTipoAtividade", tipoAtividadeDto, options);
    }

    /**
*
* @param tipoAtividadeDto
* @returns
*/
    deleteTipoAtividade(tipoAtividadeDto: TipoAtividadeDto) {

        let options = { headers: this.getHttpHeaders() };

        return this.http.post(this.actionUrl + "/createTipoAtividade", tipoAtividadeDto, options);
    }

    /**
*
* @param tipoAtividadeDto
* @returns
*/
    getOneById(tipoAtividadeDto: TipoAtividadeDto) {

        let options = { headers: this.getHttpHeaders() };

        return this.http.post(this.actionUrl + "/getOneById", tipoAtividadeDto, options);
    }

}
