import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-examination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-examination.component.html',
  styleUrls: ['./custom-examination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomExaminationComponent {

}
