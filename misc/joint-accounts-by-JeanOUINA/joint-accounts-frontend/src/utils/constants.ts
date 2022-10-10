export const PROD = process.env.NODE_ENV === 'production';
export const NULL =
	'115792089237316195423570985008687907853269984665640564039457584007913129639935'; // NULL as defined in the Joint Accounts contract
export const NULL_ADDRESS = 'vite_0000000000000000000000000000000000000000a4f3a0cb58'
export const INVALID_TOKENID = -32602;
export const CANCELED = 11012;
export enum MotionType {
	TRANSFER = '0',
	ADD_MEMBER = '1',
	REMOVE_MEMBER = '2',
	CHANGE_THRESHOLD = '3'
}
export const explorerAddressUrl = (address: string) => {
	//return `https://vitcscan.com/address/${address}`;
	return `https://vitescan.io/tx/${address}`;
}
export const explorerTxUrl = (hash: string) => {
	//return `https://vitcscan.com/tx/${hash}`;
	return `https://vitescan.io/tx/${hash}`;
}