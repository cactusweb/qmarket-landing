import { BasketDTO, BasketProductDTO } from '../../../shared/models/basket.models';
import { UtmData, UtmTags } from '../../../shared/models/utm.models';

export function buildPaidWebhook(
	basket: BasketDTO,
	tx: string,
	method: string,
	utm?: UtmData | null
) {
	const wh = {
		content: '@everyone\nWebsite payment',
		embeds: [
			{
				title: 'Payment Data',
				color: 11677439,
				fields: [
					{
						name: 'Method',
						value: method,
						inline: true,
					},
					{
						name: 'TX hash',
						value: tx,
						inline: true,
					},
				],
			},
			{
				title: 'Products',
				color: 11677439,
				fields: [
					{
						name: '🛒 List of accounts',
						value: basket.products
							.map((p) => `• ${p.name} ${p.description} ${p.quantity} accounts`)
							.join('\n'),
					},
					{
						name: '💳 Amount to pay: `' + getTotalBasketPrice(basket.products) + '`',
						value: '',
					},
				],
			},
		],
		username: 'QMarket',
		attachments: [],
	};

	if (utm) {
		console.log(utm);
		wh.embeds.push({
			title: 'UTM Data',
			color: 11677439,
			fields: [
				{
					name: 'Source',
					// @ts-ignore
					value: utm[UtmTags.SOURCE] || utm.source,
					inline: true,
				},
				{
					name: 'Medium',
					// @ts-ignore
					value: utm[UtmTags.MEDIUM] || utm.medium,
					inline: true,
				},
				{
					name: 'Campaign',
					// @ts-ignore
					value: utm[UtmTags.CAMPAIGN] || utm.campaign,
					inline: true,
				},
				{
					name: 'Term',
					// @ts-ignore
					value: utm[UtmTags.TERM] || utm.term,
					inline: true,
				},
				{
					name: 'Content',
					// @ts-ignore
					value: utm[UtmTags.CONTENT] || utm.content,
					inline: true,
				},
			],
		});
	}

	return wh;
}

function getTotalBasketPrice(products: BasketProductDTO[]) {
	const totalPrice = products
		.map((p) => Math.floor(p.price * p.quantity * 100) / 100)
		.reduce((acc, val) => acc + val, 0);

	const secondPartLength = totalPrice.toString().split('.')[1]?.length || 0;

	return secondPartLength > 1 ? Math.ceil(totalPrice * 10) / 10 : totalPrice;
}
