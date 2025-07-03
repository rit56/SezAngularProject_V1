import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gate-exit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gate-exit.component.html',
  styleUrls: ['./gate-exit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GateExitComponent {

}
