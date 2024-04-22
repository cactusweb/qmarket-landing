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
		const scrollPosition =
			window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		const sections = document.querySelectorAll('.section');

		let currentSectionId = '';

		sections.forEach((section) => {
			const sectionElement = section as HTMLElement;
			const sectionTop = sectionElement.offsetTop;
			const sectionHeight = sectionElement.offsetHeight;

			if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
				currentSectionId = section.getAttribute('id')!;
			}
		});

		return currentSectionId;
	}
}
