import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardItemComponent } from '../../../entities/card-item';

export interface Card {
	logo: string;
	name: string;
	details: string;
	price: string;
	per: string;
	description: string[];
}

@Component({
	selector: 'app-card-list',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule, CardItemComponent],
	templateUrl: './card-list.component.html',
	styleUrl: './card-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent {
	data: Card[] = [
		{
			logo: 'tm.png',
			name: 'Ticketmaster',
			details: 'aged accounts',
			price: '$8,4',
			per: 'per 1',
			description: [
				'Age 2002-2018',
				'Forwarding included',
				'Full email access',
				'Better place in queue',
				'Untested accounts ONLY',
				'1 month guarantee',
			],
		},
		{
			logo: 'tmh.png',
			name: 'Ticketmaster',
			details: 'Accounts with history',
			price: '$10,9',
			per: 'per 1',
			description: [
				'Age 2002-2018',
				'Forwarding included',
				'Full email access',
				'Random orders amount',
				'Untested accounts ONLY',
				'1 month guarantee',
			],
		},
		{
			logo: 'tmh.png',
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
		},
		{
			logo: 'tmh.png',
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
		},
	];
}
