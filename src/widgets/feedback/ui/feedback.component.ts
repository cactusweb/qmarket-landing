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
export class FeedbackComponent implements AfterViewInit {
	@ViewChildren('scroller')
	scrollers!: QueryList<ElementRef<HTMLElement>>;

	readonly FIRST_ROW_FEEDBACKS = FIRST_ROW_FEEDBACKS;
	readonly SECOND_ROW_FEEDBACKS = SECOND_ROW_FEEDBACKS;

	constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

	ngAfterViewInit(): void {
		if (isPlatformServer(this.platformId)) {
			return;
		}
		// If a user hasn't opted in for recuded motion, then we add the animation
		if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			this.addAnimation();
		}
	}

	private addAnimation() {
		this.scrollers.toArray().forEach((scroller) => {
			// Make an array from the elements within `.scroller-inner`
			const scrollerInner = scroller.nativeElement.querySelector('.scroller__inner')!;
			const scrollerContent = Array.from(scrollerInner.children);

			// For each item in the array, clone it
			// add aria-hidden to it
			// add it into the `.scroller-inner`
			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true) as HTMLElement;
				duplicatedItem.setAttribute('aria-hidden', 'true');
				scrollerInner.appendChild(duplicatedItem);
			});
		});
	}
}
