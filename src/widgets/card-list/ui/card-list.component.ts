import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardItemComponent } from '../../../entities/card-item';
import { ProductItem } from '../../../shared/models/product-item.models';
import { PRODUCT_ITEMS } from '../../../shared/consts/products.consts';

@Component({
	selector: 'app-card-list',
	standalone: true,
	imports: [CommonModule, MatIconModule, CardItemComponent],
	templateUrl: './card-list.component.html',
	styleUrl: './card-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent {
	readonly PRODUCT_ITEMS = PRODUCT_ITEMS
}
