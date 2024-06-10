import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../widgets/header';
import { FooterComponent } from '../../../widgets/footer';
import { AboutComponent } from '../../../widgets/about';
import { FaqComponent } from '../../../widgets/faq';
import { FeedbackComponent } from '../../../widgets/feedback';
import { CardListComponent } from '../../../widgets/card-list';
import { BenefitsComponent } from '../../../widgets/benefits/benefits.component';
import { BasketStatusComponent } from '../../../entities/basket-status/basket-status.component';

@Component({
	selector: 'app-layout-page',
	standalone: true,
	imports: [
		CommonModule,
		RouterOutlet,
		HeaderComponent,
		FooterComponent,
		AboutComponent,
		FaqComponent,
		FeedbackComponent,
		CardListComponent,
		BenefitsComponent,
		BasketStatusComponent,
	],
	templateUrl: './layout-page.component.html',
	styleUrl: './layout-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPageComponent {}
