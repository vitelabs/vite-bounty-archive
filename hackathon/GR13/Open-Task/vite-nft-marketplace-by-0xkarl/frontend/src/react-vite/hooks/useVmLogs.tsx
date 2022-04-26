import { useMemo, useEffect, useState } from 'react';

import { vite, WS_RPC } from '../vite';
import { Fragment } from '../types';

export type Log = {
  vmlog: {
    topics: string[];
    data: string;
  };
  accountBlockHash: string;
  accountBlockHeight: string;
  address: string;
  removed: boolean;
};

export type DataLog<T> = {
  data: T;
  log: Log;
};

export function useVmLogs<T>(
  provider: typeof WS_RPC,
  contractAddress: string,
  abi: Fragment[],
  eventName: string,
  logsFilter: (log: DataLog<T>) => boolean
): DataLog<T>[] {
  const [logs, setLogs] = useState<DataLog<T>[]>([]);

  const filteredLogs = useMemo(() => logs.filter(logsFilter), [
    logs,
    logsFilter,
  ]);

  useEffect(() => {
    let isMounted = true;
    const unsubs = [
      () => {
        isMounted = false;
      },
    ];

    const fragment = abi.find(
      (fragment: Fragment) =>
        !fragment.anonymous &&
        fragment.name === eventName &&
        fragment.type === 'event'
    );
    if (!fragment) return console.warn(`unknown fragment: ${eventName}`);
    const filterParams = {
      addressHeightRange: {
        [contractAddress]: {
          fromHeight: '0',
          toHeight: '0',
        },
      },
      topics: [[vite.abi.encodeLogSignature(fragment)]],
    };

    const load = async () => {
      const logs = await provider.request(
        'ledger_getVmLogsByFilter',
        filterParams
      );

      if (!logs?.length) return;

      const ret: DataLog<T>[] = [];

      for (let i = logs.length - 1; i >= 0; i--) {
        const log: Log = logs[i];
        const { vmlog } = log;

        const data = vite.abi.decodeLog(
          fragment,
          !vmlog.data
            ? undefined
            : vite.utils._Buffer.from(vmlog.data, 'base64').toString('hex'),
          vmlog.topics
        ) as T;

        ret.push({
          data,
          log,
        });
      }

      if (isMounted) {
        setLogs(ret);
      }
    };

    const subscribe = async () => {
      try {
        const event = await provider.subscribe(
          'createVmlogSubscription',
          filterParams
        );
        event.on((logs: any[]) => {
          if (logs.length) {
            load();
          }
        });

        unsubs.push(() => {
          provider.unsubscribe(event);
        });
      } catch (e) {
        console.warn(e);
      }
    };

    load();
    subscribe();

    return () => unsubs.forEach((unsub) => unsub());
  }, [provider, contractAddress, abi, eventName]);

  return filteredLogs;
}
