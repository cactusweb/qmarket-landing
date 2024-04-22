import { isPlatformBrowser } from '@angular/common';
import {
	AfterViewInit,
	Directive,
	ElementRef,
	HostListener,
	Inject,
	PLATFORM_ID,
} from '@angular/core';
import { IntersectionObserverDirective } from 'ngx-intersection-observer';

@Directive({
	selector: '[horizontalScroll]',
	standalone: true,
})
export class HorizontalScrollDirective implements AfterViewInit {
	private scrollInterval: any;
	private scrollSpeed = 2;
	private isScrolling = false;
	private isBrowser: boolean;
	private observer: IntersectionObserver | undefined;

	constructor(
		private el: ElementRef<HTMLElement>,
		@Inject(PLATFORM_ID) private platformId: Object
	) {
		this.isBrowser = isPlatformBrowser(this.platformId);
	}

	ngAfterViewInit() {
		this.initIntersectionObserver();
	}

	@HostListener('mousedown', ['$event'])
	onMousedown(event: MouseEvent) {
		event.preventDefault();
		const startX = event.pageX;
		const startScrollLeft = this.el.nativeElement.scrollLeft;

		const onMousemove = (moveEvent: MouseEvent) => {
			const diffX = moveEvent.pageX - startX;
			this.el.nativeElement.scrollLeft = startScrollLeft - diffX;
		};

		const onMouseup = () => {
			window.removeEventListener('mousemove', onMousemove);
			window.removeEventListener('mouseup', onMouseup);
			this.el.nativeElement.style.cursor = '';
		};

		window.addEventListener('mousemove', onMousemove);
		window.addEventListener('mouseup', onMouseup);
		this.el.nativeElement.style.cursor = 'grabbing';
	}

	@HostListener('mouseenter')
	onMouseEnter() {
		this.el.nativeElement.style.cursor = 'grab';
	}

	@HostListener('mouseleave')
	onMouseLeave() {
		this.el.nativeElement.style.cursor = '';
	}

	private initIntersectionObserver() {
		if (this.isBrowser && 'IntersectionObserver' in window) {
			this.observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !this.isScrolling) {
						this.startAutoScroll();
					}
				});
			});

			this.observer.observe(this.el.nativeElement);
		}
	}

	private startAutoScroll() {
		this.scrollInterval = setInterval(() => {
			this.el.nativeElement.scrollLeft += this.scrollSpeed;

			if (
				this.el.nativeElement.scrollLeft >=
				this.el.nativeElement.scrollWidth - (this.el.nativeElement.clientWidth + 3)
			) {
				this.scrollSpeed = -this.scrollSpeed;
			} else if (this.el.nativeElement.scrollLeft <= 0) {
				this.scrollSpeed = -this.scrollSpeed;
			}
		}, 50);
	}

	private stopAutoScroll() {
		clearInterval(this.scrollInterval);
	}

	ngOnDestroy() {
		this.stopAutoScroll();
	}
}
