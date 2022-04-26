import A from '../components/A';

export const linkText = (str = '', justBreakURLs = false) => {
  const arr = [];

  // eslint-disable-next-line
  const matches = [...str.matchAll(/(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/g)];
  if (!matches.length) {
    return str;
  }
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const url = match[0];
    const link = /http(s)?:\/\//.test(url) ? url : `https://${url}`;
    const tag = justBreakURLs ? (
      <span key={i} className="break-all">
        {url}
      </span>
    ) : (
      <A key={i} href={link} className="text-blue-500 break-all">
        {url}
      </A>
    );
    if (!i && match.index) {
      arr.push(str.slice(0, match.index));
    }
    arr.push(tag, str.slice(match.index! + url.length, matches[i + 1]?.index || undefined));
  }
  return arr;
};

export const breakURLs = (str: string = '') => linkText(str, true);
