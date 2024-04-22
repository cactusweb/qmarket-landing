import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../widgets/header';
import { FooterComponent } from '../../../widgets/footer';
import { AboutComponent } from '../../../widgets/about';
import { FaqComponent } from '../../../widgets/faq';
import { FeedbackComponent } from '../../../widgets/feedback';
import { CardListComponent } from '../../../widgets/card-list';

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
	],
	providers: [],
	templateUrl: './layout-page.component.html',
	styleUrl: './layout-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPageComponent implements OnInit, OnDestroy {
	ngOnInit(): void {}

	ngOnDestroy(): void {}
}