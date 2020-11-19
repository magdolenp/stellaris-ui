import { createAction, props } from '@ngrx/store';
import { PlanetModel, PlanetWrapperModel } from '../../models/planet.model';
import { BackendErrorModel } from '../../models/backend-error.model';

export const getPlanetsAction = createAction(
  'GetPlanetsAction',
  props<{ page?: number; search?: string }>(),
);
export const getPlanetsSuccessAction = createAction(
  'GetPlanetsSuccessAction',
  props<{ planets: PlanetWrapperModel }>(),
);
export const getPlanetsFailureAction = createAction(
  'GetPlanetsFailureAction',
  props<{ error: BackendErrorModel }>(),
);

export const getPlanetByIdAction = createAction(
  'getPlanetByIdAction',
  props<{ id: string }>(),
);
export const getPlanetByIdSuccessAction = createAction(
  'getPlanetByIdSuccessAction',
  props<{ planet: PlanetModel }>(),
);
export const getPlanetByIdFailureAction = createAction(
  'getPlanetByIdFailureAction',
  props<{ error: BackendErrorModel }>(),
);
