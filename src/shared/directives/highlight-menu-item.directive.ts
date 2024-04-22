import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
	selector: '[appHighlightMenuItem]',
	standalone: true,
})
export class HighlightMenuItemDirective {
	constructor(private el: ElementRef) {}

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

		sections.forEach((section) => {
			const sectionToTop = section.offsetTop;
			const sectionHeight = section.offsetHeight;
			const sectionToBottom = sectionToTop + sectionHeight;

			const isSectionHalfInView =
				scrollPositionTop < sectionToTop + sectionHeight / 2 &&
				scrollPositionBottom > sectionToTop + sectionHeight;

			const isSectionFullyInView =
				scrollPositionTop > sectionToTop && scrollPositionBottom > sectionToBottom;

			// if (section.id === 'faq')
			// 	console.log(scrollPositionTop, scrollPositionBottom, sectionToTop, sectionToBottom);

			// if ( scrollPosition )
			console.log(section.id, isSectionHalfInView);
			if (isSectionHalfInView || isSectionFullyInView) {
				currentSectionId = section.getAttribute('id')!;
			}
		});

		return currentSectionId;
	}
}
