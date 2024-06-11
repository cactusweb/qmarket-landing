export interface ProductItem extends ProductItemShort {
	nameForWh?: string;
	features: string[];
	goalName: string;
	openFormGoalName: string;
	sold?: boolean;
}

export interface ProductItemShort {
	id: string;
	img: string;
	name: string;
	description: string;
	price: number;
	per: number;
}
