
import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export abstract class BaseService {
  protected actionUrl: string;
  protected configuration: Configuration | undefined;

  constructor(
    protected http: HttpClient,
    @Inject(String) endpointName: string
  ) {
    this.actionUrl = new Configuration().serverWithApiUrl + `${endpointName}`;
  }

  protected getRequestUrl(): string {
    return this.actionUrl;
  }

  public getHttpHeaders(): any {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Accept'       : 'application/json',
        'Authorization': localStorage.getItem('token') || ""
      }),
    };
  }
}



@Injectable()
export class Configuration {
  public server = environment.URL;
  public apiUrl = "";
  public serverWithApiUrl = this.server + this.apiUrl;
}




