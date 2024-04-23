import { Directive, HostListener, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Directive({
	selector: '[appHighlightMenuItem]',
	standalone: true,
})
export class HighlightMenuItemDirective implements AfterViewInit {
	ngAfterViewInit(): void {
		this.onWindowScroll();
	}

	@HostListener('window:scroll', [])
	onWindowScroll() {
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

	getCurrentSectionId(): string {
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
			const isSectionHalfInView = scrollPositionBottom > sectionToTop + (sectionHeight / 5) * 3.5;

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
	}
}
