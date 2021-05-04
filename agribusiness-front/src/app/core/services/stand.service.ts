import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StandModel } from '../models/stand.model';
import { Endpoints, serviceBackUrl } from '../utils/endpoints.util';

@Injectable()
export class StandService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  postCreateStand(stand: StandModel, idFarm: number): Observable<StandModel> {
    return this.httpClient.post<StandModel>(serviceBackUrl(Endpoints.CreateStand, idFarm), stand);
  }

  deleteStand(id: string): Observable<void>{
    return this.httpClient.delete<void>(serviceBackUrl(Endpoints.DeleteStand, id));
  }

  updateStand(stand: StandModel, idFarm: number): Observable<StandModel> {
    return this.httpClient.put<StandModel>(serviceBackUrl(Endpoints.UpdateStand, idFarm, stand.id), stand);
  }

  getStandById(idStand: number, idFarm: number): Observable<StandModel> {
    return this.httpClient.get<StandModel>(serviceBackUrl(Endpoints.StandById, idFarm, idStand));
  }

}
