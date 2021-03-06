import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresas } from '../models/empresas';
@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'https://pymes2021.azurewebsites.net/api/empresas/';
  }
  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  post(obj: Empresas) {
    return this.httpClient.post(this.resourceUrl, obj);
  }
}
