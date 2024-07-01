export interface CryptoPaymentOption extends CryptoPaymentCoin {
	id: number;
	recipient: string;
}

interface CryptoPaymentCoin {
	network: string;
	coin: {
		fullname: string;
		image: string;
		name: string;
	};
}
