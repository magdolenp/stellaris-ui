import { Action, createReducer, on } from '@ngrx/store';
import {
  getPlanetByIdAction,
  getPlanetByIdFailureAction,
  getPlanetByIdSuccessAction,
  getPlanetsAction,
  getPlanetsFailureAction,
  getPlanetsSuccessAction,
} from '../actions/planet.action';
import { PlanetState } from '../../models/app-state.model';

export const planetInitialState: PlanetState = {
  data: null,
  detail: null,
  page: 1,
  search: '',
  errors: null,
  loading: false,
  loaded: false,
};

const reducer = createReducer(
  planetInitialState,

  on(getPlanetsAction, (state, { page, search }) => ({
    ...state,
    page,
    search,
    loading: true,
  })),

  on(getPlanetsAction, getPlanetByIdAction, state => ({
    ...state,
    loading: true,
  })),

  on(getPlanetsSuccessAction, (state, { planets }) => ({
    ...state,
    data: planets,
    loading: false,
    loaded: planets != null,
  })),

  on(getPlanetByIdSuccessAction, (state, { planet }) => ({
    ...state,
    detail: planet,
    loading: false,
    loaded: planet != null,
  })),

  on(
    getPlanetsFailureAction,
    getPlanetByIdFailureAction,
    (state, { error }) => ({
      ...state,
      loading: false,
      errors: error,
    }),
  ),
);

export function planetReducer(
  state: PlanetState = planetInitialState,
  action: Action,
): PlanetState {
  return reducer(state, action);
}
