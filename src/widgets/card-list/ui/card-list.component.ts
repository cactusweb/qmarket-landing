import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
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
			logo: 'tm-2.webp',
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
		},
	];
}
