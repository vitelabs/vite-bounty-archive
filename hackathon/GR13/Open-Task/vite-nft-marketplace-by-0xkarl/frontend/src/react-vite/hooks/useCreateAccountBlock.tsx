import React, { useMemo, useState } from 'react';
import toast, { LoaderIcon } from 'react-hot-toast';

import { TxStatus } from '../types';
import { sleep } from '../utils';

export type CreateAccountBlockFn = (typ: string, params: any) => Promise<void>;

export function useCreateAccountBlock(
  typ: string,
  params: any,
  createAccountBlock: CreateAccountBlockFn
) {
  const [status, setStatus] = useState<TxStatus>('pending');
  const [error, setError] = useState<string | null>(null);

  const working = useMemo(() => status === 'sending', [status]);

  const send = async () => {
    try {
      setStatus('sending');
      await createAccountBlock(typ, params);
      await sleep(2000);
      setStatus('sent');
    } catch (e) {
      const errMsg = (e as Error).message;
      toast.error(errMsg);
      setError(errMsg);
    } finally {
      setStatus('pending');
    }
  };

  const workingLoader = useMemo(
    () =>
      !working ? null : (
        <div className='flex items-center'>
          <span className='mr-1'>Please wait ...</span>
          <LoaderIcon />
        </div>
      ),
    [working]
  );

  return {
    working: workingLoader,
    status,
    send,
    error,
  };
}
