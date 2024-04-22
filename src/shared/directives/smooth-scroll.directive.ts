import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[appScrollTo]',
	standalone: true,
})
export class ScrollToDirective {
	constructor(private el: ElementRef) {}

	@HostListener('click', ['$event'])
	onClick(event: Event) {
		event.preventDefault();
		const targetId = this.el.nativeElement.getAttribute('href').substring(1);
		const targetElement = document.getElementById(targetId);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
		}
	}
}
