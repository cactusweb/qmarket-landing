import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Card } from '../../card-list/ui/card-list.component';
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
import { BehaviorSubject } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WH_URL, whBuilder } from './purchase-modal.utils';
import { YandexMetrikaService } from '../../../shared/services/yandex-metrika.service';

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
		accountsCount: new FormControl('', Validators.required),
		payment: new FormControl('bank', Validators.required),
		comment: new FormControl(''),
	});

	panelState = PanelStates.COLLAPSED;
	readonly PanelStates = PanelStates;

	readonly formState$ = new BehaviorSubject(FormStates.DEFAULT);
	readonly FormStates = FormStates;

	readonly loading$ = new BehaviorSubject(false);

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: Card,
		private dialog: DialogRef,
		private http: HttpClient,
		private yandexMetrika: YandexMetrikaService
	) {}

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
		const { contact, accountsCount, payment, comment } = this.form.value;

		this.http
			.post(
				WH_URL,
				whBuilder(
					contact!,
					accountsCount!,
					payment!,
					comment,
					this.data.nameForWh || this.data.name
				)
			)
			.subscribe({
				next: () => {
					this.formState$.next(FormStates.SUCCESS);
					this.yandexMetrika.reachGoal(this.data.goalName);
				},
				error: () => this.formState$.next(FormStates.FAILED),
			});
	}

	togglePanelState() {
		if (this.panelState === PanelStates.COLLAPSED) {
			this.panelState = PanelStates.EXPANDED;
		} else {
			this.panelState = PanelStates.COLLAPSED;
		}
	}
}
