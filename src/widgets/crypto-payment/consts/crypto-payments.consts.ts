import { CryptoPaymentOption } from '../models/crypto-payment.models';

export const HELP_LINK = 'https://cactusweb.io/how-to-pay-with-crypto';

export const CRYPTO_PAYMENT_OPTIONS: CryptoPaymentOption[] = [
	{
		id: 1,
		recipient: 'TGFbsCF2cjDgnKVRubRymd8xKRfP4Q8mBP',
		network: 'TRC20',
		coin: {
			name: 'USDT',
			fullname: 'USDT',
			image: '/assets/crypto/usdt.svg',
		},
	},
	{
		id: 2,
		recipient: '7euTdzjrH2GBEY7FfsmSDVT1twryDEb1pvSJNkM8BNq8',
		network: 'SOL',
		coin: {
			name: 'SOL',
			fullname: 'Solana',
			image: '/assets/crypto/sol.svg',
		},
	},
	{
		id: 3,
		recipient: 'LfNGuKF5roh6fEc7yDWTZZePTyBjFsgXjy',
		network: 'LTC',
		coin: {
			name: 'LTC',
			fullname: 'Litecoin',
			image: '/assets/crypto/ltc.svg',
		},
	},
	{
		id: 4,
		recipient: '1NAM1RxhgUYC4RH61kL7jPmpehZbsXTejS',
		network: 'BTC',
		coin: {
			name: 'BTC',
			fullname: 'Bitcoin',
			image: '/assets/crypto/btc.svg',
		},
	},
];

export const WH_URL =
	'https://discord.com/api/webhooks/1257405471610900653/LOdWXsSc5yuujHLaTpMUHzPc48ERlo0dczDIWLS5tNI7Rnn87yVCYSeZN54MuDW4vERd';
