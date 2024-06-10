import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { UtmService } from '../shared/services/utm.service';
import { BasketService } from '../shared/services/basket.service';

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
	}

	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.basketService.fetch();
		}
	}
}
