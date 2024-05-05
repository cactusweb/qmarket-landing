import { CommonModule, isPlatformServer } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Inject,
	PLATFORM_ID,
	QueryList,
	ViewChild,
	ViewChildren,
} from '@angular/core';
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
	@ViewChildren('scroller')
	scrollers!: QueryList<ElementRef<HTMLElement>>;

	readonly FIRST_ROW_FEEDBACKS = FIRST_ROW_FEEDBACKS;
	readonly SECOND_ROW_FEEDBACKS = SECOND_ROW_FEEDBACKS;

	constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

	get firstRow() {
		return isPlatformServer(this.platformId)
			? [...FIRST_ROW_FEEDBACKS].splice(0, 3)
			: FIRST_ROW_FEEDBACKS;
	}
	get secondRow() {
		return isPlatformServer(this.platformId)
			? [...SECOND_ROW_FEEDBACKS].splice(0, 3)
			: SECOND_ROW_FEEDBACKS;
	}
}
