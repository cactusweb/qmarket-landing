import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UtmService } from './utm.service';
import { BehaviorSubject, ReplaySubject, finalize, map, switchMap, take, tap } from 'rxjs';
import { BasketDTO, BasketProductDTO } from '../models/basket.models';
import { API_ENDPOINTS } from '../api/api.consts';
import { getUserId, setUserId } from '../utils/user-id.utils';
import { isPlatformBrowser } from '@angular/common';
import { clearQueryParams, getQueryParams } from '../utils/router.utils';
import { BasketComponent } from '../../widgets/basket/basket.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class BasketService {
	readonly basket$;
	readonly pending$;

	readonly #basket$ = new ReplaySubject<BasketDTO>(1);
	readonly #pending$ = new BehaviorSubject(false);

	constructor(
		private http: HttpClient,
		private utm: UtmService,
		@Inject(PLATFORM_ID) platformId: Object,
		private matDialog: MatDialog
	) {
		this.basket$ = this.#basket$.asObservable();
		this.pending$ = this.#pending$.asObservable();

		if (isPlatformBrowser(platformId)) {
			this.processUserId();
		}
	}

	open() {
		this.matDialog.open(BasketComponent, {
			maxWidth: '1024px',
			width: '100%',
			autoFocus: false,
			restoreFocus: false,
		});
	}

	fetch() {
		const url = API_ENDPOINTS.BASKET.replace(':param', getUserId());
		const body = { utm: this.utm.get()?.data || null };
		this.http
			.post<BasketDTO>(url, body)
			.pipe(
				tap((d) => {
					if (d.utm) {
						this.utm.set(d.utm);
					}
				})
			)
			.subscribe({
				next: (res) => this.#basket$.next(res),
				error: () => {},
			});
	}

	patchProduct(product: BasketProductDTO) {
		this.#pending$.next(true);
		return this.basket$.pipe(
			take(1),
			map((basket) => {
				if (product.quantity === 0) {
					basket.products = basket.products.filter((p) => p.id !== product.id);
				} else if (basket.products.map((p) => p.id).includes(product.id)) {
					basket.products = basket.products.map((p) => {
						if (p.id === product.id) {
							p = product;
						}
						return p;
					});
				} else {
					basket.products.push(product);
				}

				return basket;
			}),
			tap((d) => this.#basket$.next(d)),
			switchMap((basket) => this.patchBasket(basket.products)),
			tap((basket) => this.#basket$.next(basket)),
			finalize(() => this.#pending$.next(false))
		);
	}

	private patchBasket(products: BasketProductDTO[]) {
		const url = API_ENDPOINTS.BASKET.replace(':param', getUserId());
		return this.http.patch<BasketDTO>(url, { products });
	}

	private processUserId() {
		const userId = getQueryParams()['user_id'];
		if (userId) {
			setUserId(userId);
			clearQueryParams();
		}
	}
}
