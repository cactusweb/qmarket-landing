import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'qm-contacts',
	templateUrl: './contacts.component.html',
	styleUrl: './contacts.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [MatIcon, MatRipple],
})
export class ContactsComponent {}
