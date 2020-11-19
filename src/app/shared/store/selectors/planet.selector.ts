import { AppStateModel, PlanetState } from '../../models/app-state.model';
import { createSelector } from '@ngrx/store';
import { PlanetModel } from '../../models/planet.model';
import { PagingModel } from '../../models/paging.model';

export const $planetState = (state: AppStateModel): PlanetState => state.planet;

export const $planetList = createSelector(
  $planetState,
  (state: PlanetState): PlanetModel[] => state?.data?.results,
);

export const $planetDetail = createSelector(
  $planetState,
  (state: PlanetState): PlanetModel => state?.detail,
);

export const $planetPage = createSelector(
  $planetState,
  (state: PlanetState): number => state?.page,
);

export const $planetSearch = createSelector(
  $planetState,
  (state: PlanetState): string => state?.search,
);

export const $planetPagingMetadata = createSelector(
  $planetState,
  (state: PlanetState): PagingModel => {
    const data = state?.data;
    return {
      count: data?.count,
      next: data?.next,
      previous: data?.previous,
    };
  },
);

export const $planetLoading = createSelector(
  $planetState,
  (state: PlanetState): boolean => state?.loading,
);
