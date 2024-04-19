import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-layout-page',
	standalone: true,
	imports: [CommonModule, RouterOutlet],
	providers: [],
	templateUrl: './layout-page.component.html',
	styleUrl: './layout-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPageComponent implements OnInit, OnDestroy {
	ngOnInit(): void {}

	ngOnDestroy(): void {}
}
