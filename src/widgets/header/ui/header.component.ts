import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ScrollToDirective } from '../../../shared/directives/smooth-scroll.directive';
import { HighlightMenuItemDirective } from '../../../shared/directives/highlight-menu-item.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { GoalParams, MetrikaService } from '../../../shared/services/metrika.service';

interface MenuItem {
	display: string;
	goals: GoalParams;
}

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
	readonly navItems: MenuItem[] = [
		{
			display: 'Home',
			goals: {
				ym: 'home_header',
				meta: 'ViewContent',
			},
		},
		{
			display: 'Benefits',
			goals: {
				ym: 'behefits_header',
				meta: 'ViewContent',
			},
		},
		{
			display: 'Pricing',
			goals: {
				ym: 'pricing_header',
				meta: 'ViewContent',
			},
		},
		{
			display: 'Feedback',
			goals: {
				ym: 'feedback_header',
				meta: 'ViewContent',
			},
		},
		{
			display: 'FAQ',
			goals: {
				ym: 'FAQ_header',
				meta: 'ViewContent',
			},
		},
		{
			display: 'Contacts',
			goals: {
				ym: 'contacts_header',
				meta: 'ViewContent',
			},
		},
	];

	isMenuOpen = false;

	constructor(private metrikaService: MetrikaService) {}

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;

		document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
	}

	scrollTo(item: MenuItem) {
		const targetElement = document.getElementById(item.display.toLowerCase());
		if (!targetElement) {
			return;
		}
		const offsetTop = targetElement.offsetTop - 50;
		window.scrollTo({
			top: offsetTop,
			behavior: 'smooth',
		});

		this.metrikaService.reachGoal(item.goals);
	}
}
