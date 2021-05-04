import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductionModel } from '../models/production.model';
import { Endpoints, serviceBackUrl } from '../utils/endpoints.util';

@Injectable()
export class ProductionService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  postCreateProduction(idFarm: number, idStand: number, production: ProductionModel): Observable<ProductionModel> {
    return this.httpClient.post<ProductionModel>(serviceBackUrl(Endpoints.CreateProduction, idFarm, idStand), production);
  }

  deleteProduction(id: string): Observable<void> {
    return this.httpClient.delete<void>(serviceBackUrl(Endpoints.DeleteProduction, id));
  }

  putUpdateProduction(idFarm: number, idStand: number, production: ProductionModel): Observable<ProductionModel> {
    return this.httpClient.put<ProductionModel>(
      serviceBackUrl(Endpoints.UpdateProduction, idFarm, idStand, production.id), production);
  }

  getReport(id: number): Observable<any> {
    return this.httpClient.get<any>(serviceBackUrl(Endpoints.Report, id))
  }

}
