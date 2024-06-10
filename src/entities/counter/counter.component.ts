import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core';
import {
	ControlValueAccessor,
	FormsModule,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
} from '@angular/forms';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'qm-counter',
	templateUrl: './counter.component.html',
	styleUrl: './counter.component.scss',
	imports: [FormsModule, MatIcon, MatRipple],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CounterComponent),
			multi: true,
		},
	],
	standalone: true,
})
export class CounterComponent implements ControlValueAccessor {
	readonly val = signal(0);

	onTouche!: () => void;
	onChange!: (val: number) => void;

	writeValue(obj: number): void {
		this.val.set(obj);
	}

	registerOnChange(fn: (val: number) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouche = fn;
	}

	onChangeQty() {
		if (this.val() < 1) {
			this.val.set(0);
		}

		this.onChange(this.val());
		this.onTouche();
	}

	increase() {
		this.val.set(this.val() + 1);
		this.onChange(this.val());
		this.onTouche();
	}

	decrease() {
		this.val.set(this.val() - 1);
		this.onChange(this.val());
		this.onTouche();
	}
}
