import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-about',
	standalone: true,
	imports: [CommonModule, MatIconModule],
	templateUrl: './about.component.html',
	styleUrl: './about.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
