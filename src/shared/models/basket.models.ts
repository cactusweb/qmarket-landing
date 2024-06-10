import { DiscordDataDTO } from './discord.models';
import { ProductItemShort } from './product-item.models';
import { TelegramDataDTO } from './telegram.models';
import { UtmData } from './utm.models';

export interface BasketDTO {
	id: string;
	userId: string;
	createdAt: string;
	products: BasketProductDTO[];
	utm: UtmData | null;
	telegram: TelegramDataDTO | null;
	discord: DiscordDataDTO;
}

export type BasketProductDTO = ProductItemShort & { quantity: number };
