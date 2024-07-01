import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	Input,
	forwardRef,
	signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CryptoPaymentOption } from '../../models/crypto-payment.models';

type MethodId = number;

@Component({
	selector: 'qm-crypto-method-selector',
	templateUrl: './method-selector.component.html',
	styleUrls: ['./method-selector.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CryptoMethodSelectorComponent),
			multi: true,
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoMethodSelectorComponent implements ControlValueAccessor, AfterViewInit {
	@Input()
	paymentOptions!: CryptoPaymentOption[];

	readonly val = signal<MethodId | null>(null);

	onTouch!: () => void;
	onChange!: (_: MethodId) => void;

	ngAfterViewInit(): void {
		if (this.paymentOptions.length === 1) {
			this.setValue(this.paymentOptions[0].id);
		}
	}

	writeValue(val: MethodId | null): void {
		this.val.set(val);
	}
	registerOnChange(fn: (_: MethodId) => void) {
		this.onChange = fn;
	}
	registerOnTouched(fn: () => void): void {
		this.onTouch = fn;
	}

	setValue(val: MethodId) {
		this.val.set(val);
		this.onChange(val);
	}

	trackById(_: number, item: CryptoPaymentOption) {
		return item.id;
	}
}
