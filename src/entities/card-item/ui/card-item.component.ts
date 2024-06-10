import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	Input,
	OnChanges,
	inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';

import { MetrikaService } from '../../../shared/services/metrika.service';
import { ProductItem } from '../../../shared/models/product-item.models';
import { BasketService } from '../../../shared/services/basket.service';
import { map } from 'rxjs';
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
	val = 0;

	readonly #destroyRef = inject(DestroyRef);

	constructor(
		private metrika: MetrikaService,
		private basketService: BasketService
	) {}

	ngOnChanges(): void {
		this.basketService.basket$
			.pipe(
				takeUntilDestroyed(this.#destroyRef),
				map((basket) => basket.products.find((p) => p.id === this.product.id)),
				map((product) => product?.quantity || 0)
			)
			.subscribe((res) => {
				this.counter.setValue(res, { emitEvent: false });
			});

		this.counter.valueChanges
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe((res) => this.setQuantity(res!));
	}

	addToCart(): void {
		this.counter.setValue(1);
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
			})
			.subscribe(() => {});
	}
}
