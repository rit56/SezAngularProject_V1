import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-order.component.html',
  styleUrls: ['./job-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobOrderComponent {

}
