import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-receipt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentReceiptComponent {

}
