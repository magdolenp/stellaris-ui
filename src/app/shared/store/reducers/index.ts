import { AppStateModel } from '../../models/app-state.model';
import { ActionReducerMap } from '@ngrx/store';
import { planetReducer } from './planet.reducer';

export const REDUCERS: ActionReducerMap<AppStateModel> = {
  planet: planetReducer,
};
