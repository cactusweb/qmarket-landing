import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeedbackItemComponent } from '../../../entities/feedback-item';
import { HorizontalScrollDirective } from '../../../shared/directives/horizontal-scroll.directive';
import { FIRST_ROW_FEEDBACKS, SECOND_ROW_FEEDBACKS } from './common/feedback.consts';

@Component({
	selector: 'app-feedback',
	standalone: true,
	imports: [CommonModule, FeedbackItemComponent, HorizontalScrollDirective],
	templateUrl: './feedback.component.html',
	styleUrl: './feedback.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackComponent {
	readonly FIRST_ROW_FEEDBACKS = FIRST_ROW_FEEDBACKS;
	readonly SECOND_ROW_FEEDBACKS = SECOND_ROW_FEEDBACKS;
}
