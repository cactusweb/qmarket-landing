import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [CommonModule, MatIconModule, NgOptimizedImage],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
