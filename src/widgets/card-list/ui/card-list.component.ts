import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardItemComponent } from '../../../entities/card-item';

export interface Card {
	logo: string;
	name: string;
	nameForWh?: string;
	details: string;
	price: string;
	per: string;
	description: string[];
	goalName: string;
	openFormGoalName: string;
	sold?: boolean;
}

@Component({
	selector: 'app-card-list',
	standalone: true,
	imports: [CommonModule, MatIconModule, CardItemComponent],
	templateUrl: './card-list.component.html',
	styleUrl: './card-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent {
	data: Card[] = [
		{
			logo: 'tm-1.webp',
			name: 'Ticketmaster',
			details: 'aged accounts',
			nameForWh: 'Ticketmaster regular',
			price: '$4,9',
			per: 'per 1',
			description: [
				'Age 2002-2018',
				'Forwarding included',
				'Full email access',
				'Better place in queue',
				'Untested accounts ONLY',
				'1 month guarantee',
			],
			goalName: 'form_submit_ticketmaster_aged_account',
			openFormGoalName: 'click_purchase_tm_aged',
		},
		{
			logo: 'tm-2.webp',
			name: 'Ticketmaster',
			nameForWh: 'Ticketmaster history',
			details: 'Accounts with history',
			price: '$8,9',
			per: 'per 1',
			description: [
				'Age 2002-2018',
				'Forwarding included',
				'Full email access',
				'Random orders amount',
				'Untested accounts ONLY',
				'1 month guarantee',
			],
			goalName: 'form_submit_ticketmaster_account_with_history',
			openFormGoalName: 'click_purchase_tm_history',
		},
		{
			logo: 'gmail.webp',
			name: 'GMAIL',
			details: 'Forwarded',
			price: '$89,9',
			per: 'per 100',
			description: [
				'Age 1 month+',
				'Mixed regions',
				'With 2FA security',
				'Full email access',
				'Fwd to hotmail',
				'1 month guarantee',
			],
			goalName: 'form_submit_gmail',
			openFormGoalName: 'click_purchase_gmail',
			sold: true,
		},
		{
			logo: 'hotmail.webp',
			name: 'HOTMAIL',
			details: 'Forwarded',
			price: '$19,9',
			per: 'per 100',
			description: [
				'Age 1 month+',
				'Mixed regions',
				'With 2FA security',
				'Full email access',
				'Fwd to your email / domain',
				'1 month guarantee',
			],
			goalName: 'form_submit_hotmail',
			openFormGoalName: 'click_purchase_hotmail',
		},
	];
}
