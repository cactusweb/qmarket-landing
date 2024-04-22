import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ScrollToDirective } from '../../../shared/directives/smooth-scroll.directive';
import { HighlightMenuItemDirective } from '../../../shared/directives/highlight-menu-item.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, MatIconModule, ScrollToDirective, HighlightMenuItemDirective],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	animations: [
		trigger('fadeOut', [
			state(
				'visible',
				style({
					opacity: 1,
				})
			),
			state(
				'hidden',
				style({
					opacity: 0,
					display: 'none', // Добавляем display: none для скрытия элемента
				})
			),
			transition('visible => hidden', animate('0.5s ease-out')),
			transition('hidden => visible', animate('0.5s ease-out')),
		]),
	],
})
export class HeaderComponent {
	readonly navItems = ['Home', 'Pricing', 'Feedback', 'FAQ', 'Contacts'];

	isMenuOpen = false;

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;
	}

	scrollTo(id: string) {
		const targetElement = document.getElementById(id) as HTMLElement;
		if (targetElement) {
			const offsetTop = targetElement.offsetTop - 80;
			window.scrollTo({
				top: offsetTop,
				behavior: 'smooth',
			});
		}
	}
}
