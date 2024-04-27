import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Feedback } from '../../../widgets/feedback/ui/common/feedback.models';

@Component({
	selector: 'app-feedback-item',
	standalone: true,
	imports: [CommonModule, MatIconModule, NgOptimizedImage],
	templateUrl: './feedback-item.component.html',
	styleUrl: './feedback-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackItemComponent {
	@Input()
	item!: Feedback;
}
