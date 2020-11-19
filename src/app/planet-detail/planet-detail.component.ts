import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { PlanetModel } from '../shared/models/planet.model';
import { select, Store } from '@ngrx/store';
import {
  $planetDetail, $planetLoading,
  $planetPage,
  $planetSearch,
} from '../shared/store/selectors/planet.selector';
import { AppStateModel } from '../shared/models/app-state.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePaths } from '../shared/models/router-path';
import { getPlanetByIdAction } from '../shared/store/actions/planet.action';
import { take } from 'rxjs/operators';

@Component({
  selector: 'su-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetDetailComponent {
  readonly planetDetail$: Observable<PlanetModel> = this.store.pipe(
    select($planetDetail),
  );
  readonly planetLoading$: Observable<boolean> = this.store.pipe(
      select($planetLoading),
  );

  constructor(
    private readonly store: Store<AppStateModel>,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.route.params.pipe(take(1)).subscribe(params => {
      const id = params[RoutePaths.Id];
      this.store.dispatch(getPlanetByIdAction({ id }));
    });
  }

  routeBack(): void {
    combineLatest([
      this.store.select($planetPage),
      this.store.select($planetSearch),
    ])
      .pipe(take(1))
      .subscribe(([page, search]) => {
        this.router.navigate([RoutePaths.PlanetList], {
          queryParams: {
            ...(page && { page: page }),
            ...(search && { search }),
          },
        });
      });
  }
}
