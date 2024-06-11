import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { CounterComponent } from '../../../entities/counter/counter.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasketProductDTO } from '../../../shared/models/basket.models';
import { MatIcon } from '@angular/material/icon';
import { BasketService } from '../../../shared/services/basket.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
	selector: 'qm-basket-product',
	templateUrl: './basket-product.component.html',
	styleUrl: './basket-product.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CounterComponent, FormsModule, ReactiveFormsModule, MatIcon, NgOptimizedImage],
	standalone: true,
})
export class BasketProductComponent implements OnInit, AfterViewInit {
	@Input()
	product!: BasketProductDTO;

	@Input()
	titleWidth?: string;

	@Output()
	setTitleWidth = new EventEmitter<string>();

	readonly counter = new FormControl();

	constructor(
		private basketService: BasketService,
		private eRef: ElementRef<HTMLElement>
	) {
		this.counter.valueChanges
			.pipe(takeUntilDestroyed(), debounceTime(300), distinctUntilChanged())
			.subscribe((res) => {
				this.setQuantity(res);
			});
	}

	get totalPrice() {
		return Math.floor(this.product.quantity * this.product.price * 100) / 100;
	}

	ngOnInit(): void {
		this.counter.setValue(this.product.quantity, { emitEvent: false });
	}

	ngAfterViewInit(): void {
		const width = this.eRef.nativeElement.querySelector('.title')?.clientWidth;
		if (width) {
			this.setTitleWidth.emit(width + 'px');
		}
	}

	setQuantity(qty: number) {
		this.basketService
			.patchProduct({
				name: this.product.name,
				description: this.product.description,
				img: this.product.img,
				price: this.product.price,
				quantity: qty,
				id: this.product.id,
				per: this.product.per,
			})
			.subscribe(() => {});
	}
}
