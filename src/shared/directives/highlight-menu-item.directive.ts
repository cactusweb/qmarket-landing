import { isPlatformBrowser } from '@angular/common';
import {
	Directive,
	HostListener,
	ElementRef,
	OnInit,
	AfterViewInit,
	PLATFORM_ID,
	Inject,
} from '@angular/core';

@Directive({
	selector: '[appHighlightMenuItem]',
	standalone: true,
})
export class HighlightMenuItemDirective implements AfterViewInit {
	private isBrowser: boolean;

	constructor(
		private el: ElementRef<HTMLElement>,
		@Inject(PLATFORM_ID) private platformId: Object
	) {
		this.isBrowser = isPlatformBrowser(this.platformId);
	}

	ngAfterViewInit(): void {
		this.onWindowScroll();
	}

	@HostListener('window:scroll', [])
	onWindowScroll() {
		if (this.isBrowser) {
			const currentSectionId = this.getCurrentSectionId();
			const menuItems = document.querySelectorAll('.menu-item');

			menuItems.forEach((item) => {
				const itemId = item.getAttribute('data-section-id');

				if (itemId === currentSectionId) {
					item.classList.add('active');
				} else {
					item.classList.remove('active');
				}
			});
		}
	}

	getCurrentSectionId(): string {
		if (this.isBrowser) {
			const scrollPositionTop =
				window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
			const scrollPositionBottom = scrollPositionTop + window.innerHeight;

			const sections = document.querySelectorAll('.section') as NodeListOf<HTMLElement>;

			let currentSectionId = '';
			let currentSectionIsFullView = false;

			sections.forEach((section) => {
				const sectionToTop = section.offsetTop;
				const sectionHeight = section.offsetHeight;
				const sectionToBottom = sectionToTop + sectionHeight;

				/** Определяет видно ли секцию на странице хотя бы на половину */
				const isSectionHalfInView = scrollPositionBottom > sectionToTop + (sectionHeight / 5) * 2;

				/** Определяет полностью ли видно секцию на странице */
				const isSectionFullyInView =
					scrollPositionTop < sectionToTop && scrollPositionBottom > sectionToBottom - 10;

				/** Если есть блок который видно во всю страницу, и найденный не во всю страницу */
				if (currentSectionIsFullView && !isSectionFullyInView) {
					return;
				}

				if (isSectionHalfInView || isSectionFullyInView) {
					currentSectionId = section.getAttribute('id')!;
					currentSectionIsFullView = isSectionFullyInView;
				}
			});

			return currentSectionId;
		} else {
			return '';
		}
	}
}
