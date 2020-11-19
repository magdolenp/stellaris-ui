import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppStateModel } from '../shared/models/app-state.model';
import { getPlanetsAction } from '../shared/store/actions/planet.action';
import { Observable, Subject } from 'rxjs';
import { PlanetModel } from '../shared/models/planet.model';
import {
  $planetList,
  $planetLoading,
  $planetPage,
  $planetPagingMetadata,
} from '../shared/store/selectors/planet.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePaths } from '../shared/models/router-path';
import { FormControl, FormGroup } from '@angular/forms';
import { PagingModel } from '../shared/models/paging.model';
import { PageEvent } from '@angular/material/paginator/paginator';
import { debounceTime, takeUntil } from 'rxjs/operators';

const SEARCH_DEBOUNCE_MILLISECONDS = 300;

@Component({
  selector: 'su-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetListComponent implements OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();
  readonly planetList$: Observable<PlanetModel[]> = this.store.pipe(
    select($planetList),
  );
  readonly planetPage$: Observable<number> = this.store.pipe(
    select($planetPage),
  );
  readonly planetPagingMetadata$: Observable<PagingModel> = this.store.pipe(
    select($planetPagingMetadata),
  );
  readonly planetLoading$: Observable<boolean> = this.store.pipe(
    select($planetLoading),
  );

  searchForm: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  constructor(
    private readonly store: Store<AppStateModel>,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$.asObservable()))
      .subscribe(({ page, search }) => {
        if (search) {
          this.searchForm.setValue({ search });
        }
        this.store.dispatch(
          getPlanetsAction({
            ...(page && { page: Number(page) }),
            ...(search && { search }),
          }),
        );
      });

    this.searchForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(SEARCH_DEBOUNCE_MILLISECONDS),
      )
      .subscribe(search => {
        this.router.navigate([RoutePaths.PlanetList], {
          queryParams: {
            ...(search && { search: this.searchForm.value.search }),
          },
        });
      });
  }

  planetSelected(planetId: string): void {
    if (planetId) {
      this.router.navigate([RoutePaths.PlanetDetail, planetId]);
    }
  }

  setPage(pageIndex: PageEvent): void {
    const search = this.searchForm.value.search;
    this.router.navigate([RoutePaths.PlanetList], {
      queryParams: {
        ...(pageIndex && { page: pageIndex.pageIndex + 1 }),
        ...(search && { search }),
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
