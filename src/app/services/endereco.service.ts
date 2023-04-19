
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})

export abstract class EnderecoService {

  constructor(private http: HttpClient) { }

  getEndereco(cep: string) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}

