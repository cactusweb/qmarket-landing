import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { UtmService } from '../shared/services/utm.service';
import { BasketService } from '../shared/services/basket.service';
import { CHECKOUT_TYPE_KEY } from '../shared/consts/env.consts';
import { CheckoutTypes } from '../widgets/basket/models/checkout.models';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet],
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	constructor(
		private matIconRegistry: MatIconRegistry,
		private domSanitizer: DomSanitizer,
		utmService: UtmService,
		private basketService: BasketService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		@Inject(PLATFORM_ID) private platformId: Object
	) {
		this.matIconRegistry.addSvgIcon(
			'discord',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/discord.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'twitter',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/twitter.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'telegram',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/telegram.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'plus',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/plus.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'minus',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/minus.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'close',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/close.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'arrow',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/arrow.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'mail',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/mail.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'burger',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/burger.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'crypto',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/crypto.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'card',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/card.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'basket',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/basket.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'copy',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/copy.svg')
		);
	}

	ngOnInit(): void {
		if (isPlatformServer(this.platformId)) {
			return;
		}

		const path = window.location.pathname.replace('/', '');
		if (path === 'v1') {
			window.localStorage.setItem(CHECKOUT_TYPE_KEY, CheckoutTypes.OUT_SITE);
		} else if (path === 'v2') {
			window.localStorage.setItem(CHECKOUT_TYPE_KEY, CheckoutTypes.ON_SITE);
		}

		if (path) {
			this.router.navigate(['/'], {
				queryParamsHandling: 'merge',
				relativeTo: this.activatedRoute,
			});
		}

		this.basketService.fetch();
	}
}
