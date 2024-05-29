import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'qm-benefits',
	templateUrl: './benefits.component.html',
	styleUrl: './benefits.component.scss',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgOptimizedImage],
})
export class BenefitsComponent {
	readonly BENEFITS = [
		{
			icon: 'clock',
			text: 'Much better queue place in line to regular accounts.',
		},
		{
			icon: 'luck',
			text: 'High chance to get Juice accounts (instant ticket buying or same), because our accounts untested.',
			height: '24',
		},
		{
			icon: 'clock',
			text: 'Ease of use: all mails come to your email.',
		},
		{
			icon: 'tag',
			text: 'Best price on the market.',
		},
		{
			icon: 'car',
			text: 'Very fast delivery.',
			height: '16',
		},
		{
			icon: 'mark-check',
			text: 'Monthly warranty.',
		},
	];
}
