import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseAdminService } from '../layout/base/base-admin.service';
import { AtividadeDto } from '../models/atividade-dto.model';

@Injectable({
    providedIn: 'root'
})

export class AtividadeService extends BaseAdminService {

    constructor(public override http: HttpClient) {
        super(http, "/atividade");
    }

    /**
     *
     * @returns
     */
    buscarTodos() {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.post(this.actionUrl + "/buscarTodos", options);
    }

    /**
     *
     * @param token
     * @returns
     */
    getAtividadeDetalhe(token: string) {

        let options = this.getHttpHeaders();
        options.params = new HttpParams();
        options.params = options.params.set("token", token);

        return this.http.get(this.actionUrl + "/getAtividadeDetalhe", options);

    }

    /**
     *
     * @param atividadeDto
     * @returns
     */
    updateAtividade(atividadeDto: AtividadeDto) {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.post(this.actionUrl + "/updateAtividade", atividadeDto, options);
    }

        /**
     *
     * @param atividadeDto
     * @returns
     */
        deleteAtividade(atividadeDto: AtividadeDto) {

            let headers = this.getHttpHeaders();

            let options = { headers: headers };

            return this.http.post(this.actionUrl + "/deleteAtividade", atividadeDto, options);
        }

       /**
     *
     * @param atividadeDto
     * @returns
     */
    createAtividade(atividadeDto: AtividadeDto) {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.post(this.actionUrl + "/createAtividade", atividadeDto, options);
    }

     /**
     *
     * @returns
     */
      getTiposAtividade() {

        let headers = this.getHttpHeaders();

        let options = { headers: headers };

        return this.http.post(this.actionUrl + "/getTiposAtividade", options);
    }

}
