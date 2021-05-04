import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FarmModel } from '../models/farm.model';
import { Endpoints, serviceBackUrl } from '../utils/endpoints.util';

@Injectable()
export class FarmService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAllByUser(): Observable<FarmModel> {
    return this.httpClient.get<FarmModel>(serviceBackUrl(Endpoints.AllFarms));
  }

  getById(id: string): Observable<FarmModel> {
    return this.httpClient.get<FarmModel>(serviceBackUrl(Endpoints.FarmsById, id));
  }

  postCreateFarm(farm: FarmModel): Observable<FarmModel> {
    return this.httpClient.post<FarmModel>(serviceBackUrl(Endpoints.CreateFarm), farm);
  }

  deletFarm(id: string): Observable<void> {
    return this.httpClient.delete<void>(serviceBackUrl(Endpoints.DeleteFarm, id));
  }

  updateFarm(farm: FarmModel): Observable<FarmModel> {
    return this.httpClient.put<FarmModel>(serviceBackUrl(Endpoints.UpdateFarm, farm.id), farm);
  }
}
