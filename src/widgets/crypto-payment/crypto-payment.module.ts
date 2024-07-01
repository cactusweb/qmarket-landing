import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CryptoPaymentComponent } from './crypto-payment.component';
import { CryptoHelpLinkComponent } from './components/help-link/help-link.component';
import { CryptoRecipientComponent } from './components/recipient/recipient.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CryptoMethodSelectorComponent } from './components/method-selector/method-selector.component';
import { CryptoMethodOptionComponent } from './components/method-option/method-option.component';
import { NgVarDirective } from '../../shared/directives/ngvar.directive';
import { MatRipple } from '@angular/material/core';

@NgModule({
	declarations: [
		CryptoPaymentComponent,
		CryptoHelpLinkComponent,
		CryptoRecipientComponent,
		CryptoMethodSelectorComponent,
		CryptoMethodOptionComponent,
	],
	exports: [CryptoPaymentComponent],
	imports: [
		CommonModule,
		MatIconModule,
		FormsModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatProgressSpinnerModule,
		NgVarDirective,
		MatRipple,
	],
	providers: [MatSnackBar],
})
export class CsdCryptoPaymentModule {}
