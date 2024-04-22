import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet],
	templateUrl: './app.component.html',
})
export class AppComponent {
	constructor(
		private matIconRegistry: MatIconRegistry,
		private domSanitizer: DomSanitizer
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
	}
}
