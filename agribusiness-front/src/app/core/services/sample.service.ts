import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SampleModel } from '../models/sample.model';
import { Endpoints, serviceBackUrl } from '../utils/endpoints.util';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor(
    private httpClient: HttpClient,
  ) { }

    postCreateSample(idFarm: number, idStand: number, sample: SampleModel): Observable<SampleModel> {
      return this.httpClient.post<SampleModel>(serviceBackUrl(Endpoints.CreateSample, idFarm, idStand), sample);
    }

    deleteSample(id: string): Observable<void> {
      return this.httpClient.delete<void>(serviceBackUrl(Endpoints.DeleteSample, id));
    }

    putUpdateSample(idFarm: number, idStand: number, sample: SampleModel): Observable<SampleModel> {
      return this.httpClient.put<SampleModel>(
        serviceBackUrl(Endpoints.UpdateSample, idFarm, idStand, sample.id),sample);
    }
  
}
