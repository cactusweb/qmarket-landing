import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';

import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { BehaviorSubject, filter, take } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WH_URL, whBuilder } from './purchase-modal.utils';
import { MetrikaService } from '../../../shared/services/metrika.service';
import { API_ENDPOINTS } from '../../../shared/api/api.consts';
import { UtmService } from '../../../shared/services/utm.service';
import { DsJoinerService } from '../../../shared/services/ds-joiner.service';
import { ProductItem } from '../../../shared/models/product-item.models';

enum PanelStates {
	COLLAPSED = 'COLLAPSED',
	EXPANDED = 'EXPANDED',
}

enum FormStates {
	DEFAULT = 'DEFAULT',
	LOADING = 'LOADING',
	FAILED = 'FAILED',
	SUCCESS = 'SUCCESS',
}

@Component({
	selector: 'app-purchase-modal',
	standalone: true,
	imports: [
		CommonModule,
		MatIconModule,
		MatDialogClose,
		FormsModule,
		ReactiveFormsModule,
		NgOptimizedImage,
		HttpClientModule,
		TextFieldModule,
	],
	providers: [DsJoinerService],
	templateUrl: './purchase-modal.component.html',
	styleUrl: './purchase-modal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('panel', [
			state(
				PanelStates.COLLAPSED,
				style({
					height: '0px',
					paddingTop: '0px',
					paddingBottom: '0px',
				})
			),
			state(
				PanelStates.EXPANDED,
				style({
					height: '*',
					padding: '*',
				})
			),
			transition(`${PanelStates.COLLAPSED} <=> ${PanelStates.EXPANDED}`, animate('0.2s ease-out')),
		]),
	],
})
export class PurchaseModalComponent {
	readonly form = new FormGroup({
		contact: new FormControl('', Validators.required),
		quantity: new FormControl('', Validators.required),
		paymentMethod: new FormControl('bank', Validators.required),
		comment: new FormControl(''),
	});

	panelState = PanelStates.COLLAPSED;
	readonly PanelStates = PanelStates;

	readonly formState$ = new BehaviorSubject(FormStates.DEFAULT);
	readonly FormStates = FormStates;

	readonly loading$ = new BehaviorSubject(false);
	readonly joinLoading$ = this.dsJoiner.loading$;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: ProductItem,
		private dialog: DialogRef,
		private http: HttpClient,
		private metrika: MetrikaService,
		private utm: UtmService,
		private dsJoiner: DsJoinerService
	) {}

	onDiscordJoin() {
		this.joinLoading$
			.pipe(
				take(1),
				filter((loading) => !loading)
			)
			.subscribe(() => this.dsJoiner.join());
	}

	close() {
		this.dialog.close();
	}

	onSubmit() {
		if (this.formState$.value === FormStates.FAILED) {
			this.formState$.next(FormStates.DEFAULT);
			return;
		}

		if (this.formState$.value === FormStates.SUCCESS) {
			return;
		}

		this.form.markAllAsTouched();
		if (this.form.invalid) {
			return;
		}

		this.formState$.next(FormStates.LOADING);

		// this.http
		// 	.post(API_ENDPOINTS.PURCHASE, {
		// 		product: this.data.nameForWh || this.data.name,
		// 		...this.form.value,
		// 		utm: this.utm.getUtm()?.data,
		// 	})
		// 	.subscribe({
		// 		next: () => {
		// 			this.formState$.next(FormStates.SUCCESS);
		// 			this.metrika.reachGoalYandex(this.data.goalName);
		// 			this.metrika.trackPixel('Lead');
		// 		},
		// 		error: () => this.formState$.next(FormStates.FAILED),
		// 	});
	}

	togglePanelState() {
		if (this.panelState === PanelStates.COLLAPSED) {
			this.panelState = PanelStates.EXPANDED;
		} else {
			this.panelState = PanelStates.COLLAPSED;
		}
	}
}
