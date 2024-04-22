import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FeedbackItemComponent } from '../../../entities/feedback-item';
import { HorizontalScrollDirective } from '../../../shared/directives/horizontal-scroll.directive';

@Component({
	selector: 'app-feedback',
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		FeedbackItemComponent,
		HorizontalScrollDirective,
	],
	templateUrl: './feedback.component.html',
	styleUrl: './feedback.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackComponent {
	readonly feedbackData = [
		{
			avatar: 'ava1.png',
			name: 'ksa',
			date: '17/11/2023 13:11',
			text: 'order delivered quickly',
		},
		{
			avatar: 'ava2.png',
			name: 'Shiba',
			date: '03/12/2023 11:35',
			text: 'Quick deliver / organized will purchase again',
		},
		{
			avatar: 'ava1.png',
			name: 'ksa',
			date: '17/11/2023 13:11',
			text: 'order delivered quickly',
		},
		{
			avatar: 'ava2.png',
			name: 'Shiba',
			date: '03/12/2023 11:35',
			text: 'Quick deliver / organized will purchase again',
		},
		{
			avatar: 'ava1.png',
			name: 'ksa',
			date: '17/11/2023 13:11',
			text: 'order delivered quickly',
		},
		{
			avatar: 'ava2.png',
			name: 'Shiba',
			date: '03/12/2023 11:35',
			text: 'Quick deliver / organized will purchase again',
		},
		{
			avatar: 'ava1.png',
			name: 'ksa',
			date: '17/11/2023 13:11',
			text: 'order delivered quickly',
		},
		{
			avatar: 'ava2.png',
			name: 'Shiba',
			date: '03/12/2023 11:35',
			text: 'Quick deliver / organized will purchase again',
		},
		{
			avatar: 'ava3.png',
			name: 'Dave',
			date: '05/03/2024 21:51',
			text: 'Exactly what I asked for and been helpful throughout the </br> process. Especially fast delivery this time around! Thanks',
		},
		{
			avatar: 'ava4.png',
			name: 'bjevryday',
			date: '28/12/2023 09:11',
			text: 'Delivery is supposed to be 3-4 days, got my order with a bit over a week delay. No big deal, </br> customer service is good and spreadsheet is professional and complete.',
		},
		{
			avatar: 'ava3.png',
			name: 'Dave',
			date: '05/03/2024 21:51',
			text: 'Exactly what I asked for and been helpful throughout the </br> process. Especially fast delivery this time around! Thanks',
		},
		{
			avatar: 'ava4.png',
			name: 'bjevryday',
			date: '28/12/2023 09:11',
			text: 'Delivery is supposed to be 3-4 days, got my order with a bit over a week delay. No big deal, </br> customer service is good and spreadsheet is professional and complete.',
		},
		{
			avatar: 'ava3.png',
			name: 'Dave',
			date: '05/03/2024 21:51',
			text: 'Exactly what I asked for and been helpful throughout the </br> process. Especially fast delivery this time around! Thanks',
		},
		{
			avatar: 'ava4.png',
			name: 'bjevryday',
			date: '28/12/2023 09:11',
			text: 'Delivery is supposed to be 3-4 days, got my order with a bit over a week delay. No big deal, </br> customer service is good and spreadsheet is professional and complete.',
		},
		{
			avatar: 'ava3.png',
			name: 'Dave',
			date: '05/03/2024 21:51',
			text: 'Exactly what I asked for and been helpful throughout the </br> process. Especially fast delivery this time around! Thanks',
		},
		{
			avatar: 'ava4.png',
			name: 'bjevryday',
			date: '28/12/2023 09:11',
			text: 'Delivery is supposed to be 3-4 days, got my order with a bit over a week delay. No big deal, </br> customer service is good and spreadsheet is professional and complete.',
		},
	];

	splitArray(arr: any[]) {
		const middleIndex = Math.ceil(arr.length / 2);
		const firstHalf = arr.slice(0, middleIndex);
		const secondHalf = arr.slice(middleIndex);
		return { firstHalf, secondHalf };
	}
}
