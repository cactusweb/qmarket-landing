import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('../pages/pages.routes').then((m) => m.routes),
	},
	{
		path: 'v1',
		loadChildren: () => import('../pages/pages.routes').then((m) => m.routes),
	},
	{
		path: 'v2',
		loadChildren: () => import('../pages/pages.routes').then((m) => m.routes),
	},
	{
		path: '**',
		redirectTo: '/',
	},
];
