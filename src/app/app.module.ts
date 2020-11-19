import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanetListComponent } from './planet-list/planet-list.component';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { REDUCERS } from './shared/store/reducers';
import { SwApiService } from './shared/services/sw-api.service';
import { EffectsModule } from '@ngrx/effects';
import { EFFECTS } from './shared/store/effects';
import { HttpClientModule } from '@angular/common/http';
import { PlanetPreviewComponent } from './planet-list/planet-preview/planet-preview.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    PlanetListComponent,
    PlanetDetailComponent,
    PlanetPreviewComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    EffectsModule.forRoot(EFFECTS),
    HttpClientModule,
    StoreModule.forRoot(REDUCERS),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    ReactiveFormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [SwApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
