import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CryptoPaymentOption } from '../../models/crypto-payment.models';

@Component({
  selector: 'qm-crypto-method-option',
  templateUrl: './method-option.component.html',
  styleUrls: ['./method-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoMethodOptionComponent {
  @Input()
  selected = false;

  @Input()
  option!: CryptoPaymentOption;
}
