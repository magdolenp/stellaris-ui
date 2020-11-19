import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PlanetModel, PlanetWrapperModel } from '../models/planet.model';
import { Observable } from 'rxjs';

const PLANETS_API_URL = '/planets/';

@Injectable()
export class SwApiService {
  constructor(private readonly httpClient: HttpClient) {}

  getPlanets(page?: number, search?: string): Observable<PlanetWrapperModel> {
    return this.httpClient.get<PlanetWrapperModel>(
      `${environment.apiUrl}${PLANETS_API_URL}`,
      {
        params: {
          ...(page && { page: String(page) }),
          ...(search && { search }),
        },
      },
    );
  }

  getPlanetById(id: string): Observable<PlanetModel> {
    return this.httpClient.get<PlanetModel>(
      `${environment.apiUrl}${PLANETS_API_URL}${id}/`,
    );
  }
}
