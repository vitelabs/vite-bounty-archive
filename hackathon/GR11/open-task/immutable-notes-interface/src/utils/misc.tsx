import { tipTokenIds, tokensMap } from './constants';
import { utils } from '@vite/vitejs';

export const TwitterIcon = ({ size = 24 }: { size?: number }) => (
  <svg className="fill-current" width={size} height={size} viewBox="0 0 20 20">
    <path d="M20 3.92377C19.2639 4.25068 18.4731 4.47067 17.6432 4.5699C18.4908 4.06223 19.1408 3.25841 19.4469 2.29999C18.6547 2.76997 17.7762 3.1115 16.8409 3.2961C16.0925 2.49844 15.0263 2 13.8464 2C11.5803 2 9.74347 3.83762 9.74347 6.10292C9.74347 6.42445 9.78039 6.73828 9.84962 7.0375C6.43975 6.86674 3.41679 5.23295 1.39225 2.74997C1.03996 3.3561 0.83766 4.06069 0.83766 4.81374C0.83766 6.23676 1.56148 7.49287 2.66221 8.22822C1.98992 8.20669 1.35687 8.02208 0.803815 7.71517C0.803815 7.73286 0.803815 7.74901 0.803815 7.7667C0.803815 9.75509 2.21761 11.4135 4.09523 11.7896C3.75139 11.8835 3.38833 11.9335 3.01373 11.9335C2.74989 11.9335 2.49221 11.9073 2.24222 11.8604C2.76451 13.4903 4.27984 14.6772 6.07515 14.7103C4.67136 15.811 2.9022 16.4671 0.979193 16.4671C0.648437 16.4671 0.321526 16.4479 0 16.4094C1.81608 17.5733 3.97216 18.2525 6.28976 18.2525C13.8372 18.2525 17.9632 12.0004 17.9632 6.57829C17.9632 6.4006 17.9593 6.22368 17.9516 6.04754C18.7539 5.46833 19.45 4.74605 20 3.92377Z"></path>
  </svg>
);

export const RelatedIcon = ({ size = 24 }: { size?: number }) => (
  <svg className="fill-current" width={size} height={size} viewBox="0 0 1000 1000">
    <path d="M842.7,694.6c-39.6,0-75.6,15.7-102.1,41.2L398.3,520.3c0.7-6.5,1-13.2,1-19.9c0-6.4-0.3-12.7-1-18.9l343.3-216.3c26.4,24.9,61.9,40.2,101,40.2c81.3,0,147.3-66,147.3-147.3c0-81.3-66-147.3-147.3-147.3s-147.3,66-147.3,147.3c0,6.5,0.4,13,1.3,19.4L363.3,387.6c-35.3-49.5-93.2-81.8-158.6-81.8C97.2,305.7,10,392.9,10,500.4c0,107.5,87.2,194.6,194.7,194.6c65.1,0,122.7-32,158.1-81.1l333.8,210.2c-0.7,5.9-1.1,11.8-1.1,17.8c0,81.3,65.9,147.3,147.3,147.3S990,923.3,990,841.9C990,760.6,924,694.6,842.7,694.6z M842.7,109.1c27.1,0,49.1,22,49.1,49s-22.1,49-49.1,49c-27,0-49-22-49-49C793.7,131.1,815.7,109.1,842.7,109.1z M204.7,596.8c-53.2,0-96.5-43.3-96.5-96.4c0-53.2,43.3-96.5,96.5-96.5s96.4,43.3,96.4,96.5C301.1,553.6,257.9,596.8,204.7,596.8z M842.7,891c-27,0-49-22-49-49c0-27.1,22-49.1,49-49.1c27.1,0,49.1,22,49.1,49.1C891.8,869,869.8,891,842.7,891z" />
  </svg>
);

export const EditIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

export const shortenAddress = (address: string) => address.substring(0, 10) + '...' + address.substring(50);
export const shortenHash = (address: string) => address.substring(0, 5) + '...' + address.substring(59);

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formatDate = (date: number | Date, verbose?: boolean, utc?: boolean) => {
  if (!date) {
    return;
  }
  date = new Date(date);
  const day = date[`get${utc ? 'UTC' : ''}Date`]();
  const month = date[`get${utc ? 'UTC' : ''}Month`]();
  const year = date[`get${utc ? 'UTC' : ''}FullYear`]();

  if (verbose) {
    const minute = date.getMinutes();
    // · middle dot shift+option+9
    // • bullet option+8
    return `${year} ${MONTHS[month]} ${day} · ${date.getHours()}:${minute < 10 ? `0${minute}` : minute}`;
  }
  return `${year}-${month + 1}-${day}`;
};

export const amountToStringInt = (amount: string, decimals: number = 0) => {
  const num = +amount;
  if (Number.isNaN(num)) {
    return num + '';
  }
  return num * 10 ** decimals + '';
};

export const stringIntToAmount = (amount: string | number, decimals: number = 0, maxDecimals?: number) => {
  let num = +amount;
  if (Number.isNaN(num)) {
    return 0;
  }
  num = num / 10 ** decimals;
  if (maxDecimals !== undefined) {
    return parseFloat(num.toFixed(maxDecimals));
  }
  return num;
};

export const tipsCountToObject = (tipsCount?: string[]) => {
  return Array.isArray(tipsCount)
    ? tipsCount.reduce((acc: { [tokenId: string]: number }, amount, i) => {
        acc[tipTokenIds[i]] = stringIntToAmount(amount, tokensMap.get(tipTokenIds[i])?.decimals);
        return acc;
      }, {})
    : {};
};

export const isValidHash = (str: string) => str.length === 64 && utils.isHexString(str);
