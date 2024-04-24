import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ScrollToDirective } from '../../../shared/directives/smooth-scroll.directive';
import { HighlightMenuItemDirective } from '../../../shared/directives/highlight-menu-item.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [
		CommonModule,
		MatIconModule,
		ScrollToDirective,
		HighlightMenuItemDirective,
		NgOptimizedImage,
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
	readonly navItems = ['Home', 'Pricing', 'Feedback', 'FAQ', 'Contacts'];

	isMenuOpen = false;

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;

		document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
	}

	scrollTo(id: string) {
		const targetElement = document.getElementById(id.toLowerCase());
		if (!targetElement) {
			return;
		}
		const offsetTop = targetElement.offsetTop - 80;
		window.scrollTo({
			top: offsetTop,
			behavior: 'smooth',
		});
	}
}
