import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRipple } from '@angular/material/core';

@Component({
	selector: 'app-faq',
	standalone: true,
	imports: [CommonModule, MatIconModule, MatExpansionModule, MatRipple],
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
				'All emails from the emails will be forwarded to your email or domain, which we will request from you. However, you will also have direct access to each email.',
			open: false,
		},
		{
			title: 'Whats difference between history and aged?',
			description:
				'The only difference lies in the presence of order history. Accounts with order history already have ticket purchases. The number of tickets is random. It is believed that such accounts occupy better positions in the queue compared to regular aged accounts. And yes, accounts with history are also aged.',
			open: false,
		},
		{
			title: 'Do you have bulk discounts?',
			description:
				'Yes, of course, we offer pleasant discounts for large volume orders. Additionally, we collaborate directly with ticket brokers and provide them with individual terms.',
			open: false,
		},
	];
}
