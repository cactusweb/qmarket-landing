import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
	selector: 'app-faq',
	standalone: true,
	imports: [CommonModule, MatIconModule, MatExpansionModule],
	templateUrl: './faq.component.html',
	styleUrl: './faq.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class FaqComponent {
	expConfig = [
		{
			title: 'Will i have full access to my account?',
			description:
				'Yes, you get full access to the account, both to the email and to the account itself. We also provide access to all security measures, including 2FA code.',
			open: false,
		},
		{
			title: 'How can i receive mails from accounts?',
			description:
				'Yes, you get full access to the account, both to the email and to the account itself. We also provide access to all security measures, including 2FA code.',
			open: false,
		},
		{
			title: 'Whats difference between history and aged?',
			description:
				'Yes, you get full access to the account, both to the email and to the account itself. We also provide access to all security measures, including 2FA code.',
			open: false,
		},
		{
			title: 'Do you have bulk discounts?',
			description:
				'Yes, you get full access to the account, both to the email and to the account itself. We also provide access to all security measures, including 2FA code.',
			open: false,
		},
	];
}
