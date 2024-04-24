import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-feedback-item',
	standalone: true,
	imports: [CommonModule, MatIconModule],
	templateUrl: './feedback-item.component.html',
	styleUrl: './feedback-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackItemComponent {
	@Input()
	avatar!: string;
	@Input()
	name!: string;
	@Input()
	date!: string;
	@Input()
	text!: string;
}
