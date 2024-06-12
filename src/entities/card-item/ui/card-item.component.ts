import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	Input,
	OnChanges,
	inject,
	signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';

import { MetrikaService } from '../../../shared/services/metrika.service';
import { ProductItem } from '../../../shared/models/product-item.models';
import { BasketService } from '../../../shared/services/basket.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CounterComponent } from '../../counter/counter.component';
import { MatRipple } from '@angular/material/core';

@Component({
	selector: 'app-card-item',
	standalone: true,
	imports: [
		CommonModule,
		MatIconModule,
		NgOptimizedImage,
		CounterComponent,
		FormsModule,
		ReactiveFormsModule,
		MatRipple,
	],
	templateUrl: './card-item.component.html',
	styleUrl: './card-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardItemComponent implements OnChanges {
	@Input()
	product!: ProductItem;

	readonly counter = new FormControl(0);
	readonly #productsCount = signal(0);

	readonly #destroyRef = inject(DestroyRef);

	constructor(
		private metrika: MetrikaService,
		private basket: BasketService
	) {}

	get price() {
		return Math.floor(this.product.price * this.product.per * 100) / 100;
	}

	ngOnChanges(): void {
		this.basket.basket$
			.pipe(
				takeUntilDestroyed(this.#destroyRef),
				map((basket) => basket.products.find((p) => p.id === this.product.id)),
				map((product) => product?.quantity || 0)
			)
			.subscribe((res) => {
				this.#productsCount.set(res);
				this.counter.setValue(res, { emitEvent: false });
			});

		this.counter.valueChanges
			.pipe(
				takeUntilDestroyed(this.#destroyRef),
				debounceTime(500),
				distinctUntilChanged((_, newVal) => newVal === this.#productsCount())
			)
			.subscribe((res) => this.setQuantity(res!));
	}

	openBasket() {
		this.basket.open();
	}

	addToCart(): void {
		this.setQuantity(this.product.per);
	}

	setQuantity(qty: number) {
		this.basket
			.patchProduct({
				name: this.product.name,
				description: this.product.description,
				img: this.product.img,
				price: this.product.price,
				quantity: qty,
				id: this.product.id,
				per: this.product.per,
				shortName: this.product.shortName,
			})
			.subscribe(() => {});
	}
}
