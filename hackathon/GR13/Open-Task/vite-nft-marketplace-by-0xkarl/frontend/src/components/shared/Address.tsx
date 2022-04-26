import React, { FC, useMemo } from 'react';
import { useViteProvider } from '@react-vite';

import { abbrAddress } from '@utils/string';
import CopyToClipboard from '@components/shared/CopyToClipboard';

const N = 5;

const Address: FC<{ address: string; copy?: boolean }> = ({
  address,
  copy = true,
}) => {
  const { baseBlockexplorerUrl } = useViteProvider();
  const formatedAddress = useMemo(() => {
    return abbrAddress(address, N + 5, N);
  }, [address]);

  const blockExplorerLink = useMemo(
    () => `${baseBlockexplorerUrl}/account/${address}`,
    [address, baseBlockexplorerUrl]
  );

  return (
    <CopyToClipboard {...(copy ? { text: address } : null)}>
      <a
        href={blockExplorerLink}
        className={'flex items-center text-primary font-bold'}
        target='_blank'
        rel='noreferrer'
      >
        {formatedAddress}
      </a>
    </CopyToClipboard>
  );
};

export default Address;
