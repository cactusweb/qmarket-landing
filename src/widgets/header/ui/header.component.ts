import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ScrollToDirective } from '../../../shared/directives/smooth-scroll.directive';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, MatIconModule, ScrollToDirective],
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
