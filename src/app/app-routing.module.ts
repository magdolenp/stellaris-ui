import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutePaths } from './shared/models/router-path';
import { PlanetListComponent } from './planet-list/planet-list.component';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';

const routes: Routes = [
  {
    path: RoutePaths.PlanetList,
    component: PlanetListComponent,
  },
  {
    path: `${RoutePaths.PlanetDetail}/:${RoutePaths.Id}`,
    component: PlanetDetailComponent,
  },
  {
    path: '**',
    redirectTo: RoutePaths.PlanetList,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
