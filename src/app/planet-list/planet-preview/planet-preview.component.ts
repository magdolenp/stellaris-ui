import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PlanetModel } from '../../shared/models/planet.model';

@Component({
  selector: 'su-planet-preview',
  templateUrl: './planet-preview.component.html',
  styleUrls: ['./planet-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetPreviewComponent {
  @Input() planet: PlanetModel;
  @Output() planetSelected = new EventEmitter<string>();

  selectPlanet(): void {
    this.planetSelected.emit(this.planet?.id || '4');
  }
}
