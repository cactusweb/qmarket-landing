export function whBuilder(
	contact: string,
	quantity: string,
	paymentMethod: string,
	productName: string
) {
	return {
		content: '@everyone',
		embeds: [
			{
				title: `New feedback by product **${productName}**`,
				color: 11677439,
				fields: [
					{
						name: 'Contact',
						value: contact,
					},
					{
						name: 'Payment Method',
						value: paymentMethod,
					},
					{
						name: 'Product',
						value: productName,
						inline: true,
					},
					{
						name: 'Quantity',
						value: quantity,
						inline: true,
					},
				],
				footer: {
					text: 'Sent from Q-market.store',
				},
				timestamp: new Date().toISOString(),
			},
		],
		username: 'QMarket',
		attachments: [],
	};
}

export const WH_URL =
	'https://discord.com/api/webhooks/1232770818094792816/QbbF5S89ylXQ0VTkbnOUf4XwReZOHCKNJEMg5lsXB9_mJ4Qnqb-SLItNsxT-KGpSP6li';
