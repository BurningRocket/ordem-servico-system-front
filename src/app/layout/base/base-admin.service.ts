
import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export abstract class BaseAdminService {
  protected actionUrl: string;

  constructor(
    protected http: HttpClient,
    @Inject(String) endpointName: string
  ) {
    this.actionUrl = new Configuration().serverWithApiUrl + `${endpointName}`;
  }

  protected getRequestUrl(): string {
    return this.actionUrl;
  }

  protected getHttpHeaders(): any {
    return new HttpHeaders({
        "Content-Type": "application/json",
        'Accept'       : 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  }
}



@Injectable()
export class Configuration {
  public server = environment.URL;
  public apiUrl = "";
  public serverWithApiUrl = this.server + this.apiUrl;
}




