import { BackendErrorModel } from './backend-error.model';
import { PlanetModel, PlanetWrapperModel } from './planet.model';

export type PlanetState = EntityStoreState<PlanetWrapperModel, PlanetModel>;

export interface AppStateModel {
  planet: PlanetState;
}

export interface BasicStoreState<T = BackendErrorModel> {
  errors: T | null;
  loading: boolean;
  loaded: boolean;
}

export interface EntityStoreState<T, U, V = BackendErrorModel>
  extends BasicStoreState<V> {
  data: T;
  detail: U;
  search: string;
  page: number;
}
