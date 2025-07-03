import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gate-pass',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gate-pass.component.html',
  styleUrls: ['./gate-pass.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GatePassComponent {

}
