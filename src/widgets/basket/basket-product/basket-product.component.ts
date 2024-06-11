import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CounterComponent } from '../../../entities/counter/counter.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasketProductDTO } from '../../../shared/models/basket.models';
import { MatIcon } from '@angular/material/icon';
import { BasketService } from '../../../shared/services/basket.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';

@Component({
	selector: 'qm-basket-product',
	templateUrl: './basket-product.component.html',
	styleUrl: './basket-product.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CounterComponent, FormsModule, ReactiveFormsModule, MatIcon, NgOptimizedImage],
	standalone: true,
})
export class BasketProductComponent implements OnInit {
	@Input()
	product!: BasketProductDTO;

	readonly counter = new FormControl();

	constructor(private basketService: BasketService) {
		this.counter.valueChanges.pipe(takeUntilDestroyed()).subscribe((res) => {
			this.setQuantity(res);
		});
	}

	ngOnInit(): void {
		this.counter.setValue(this.product.quantity, { emitEvent: false });
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
