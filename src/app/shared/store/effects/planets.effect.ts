import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getPlanetByIdAction,
  getPlanetByIdFailureAction,
  getPlanetByIdSuccessAction,
  getPlanetsAction,
  getPlanetsFailureAction,
  getPlanetsSuccessAction,
} from '../actions/planet.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SwApiService } from '../../services/sw-api.service';
import { PlanetWrapperModel } from '../../models/planet.model';

const URL_REGEX = /\d+(?!\d+)/; // match any number if it is not immediately followed by a number
const urlToId = (url: string): string => url.match(URL_REGEX)[0]; // e.g. http://swapi.dev/api/planets/1/

const normalizePlanetsId = (data: PlanetWrapperModel): PlanetWrapperModel => ({
  ...data,
  results: data?.results?.map(planet => ({
    ...planet,
    id: urlToId(planet.url),
  })),
});

@Injectable()
export class PlanetsEffect {
  getPlanets = createEffect(() =>
    this.actions$.pipe(
      ofType(getPlanetsAction),
      switchMap(({ page, search }) =>
        this.swApiService.getPlanets(page, search).pipe(
          map(planets =>
            getPlanetsSuccessAction({ planets: normalizePlanetsId(planets) }),
          ),
          catchError(error => of(getPlanetsFailureAction({ error }))),
        ),
      ),
    ),
  );

  getPlanetById = createEffect(() =>
    this.actions$.pipe(
      ofType(getPlanetByIdAction),
      switchMap(({ id }) =>
        this.swApiService.getPlanetById(id).pipe(
          map(planet =>
            getPlanetByIdSuccessAction({
              planet: {
                ...planet,
                id: urlToId(planet.url),
              },
            }),
          ),
          catchError(error => of(getPlanetByIdFailureAction({ error }))),
        ),
      ),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly swApiService: SwApiService,
  ) {}
}
