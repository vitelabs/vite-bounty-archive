import React, { FC, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import moment from 'moment';

const DateComponent: FC<{ timestamp?: number }> = ({ timestamp }) => {
  const fmt = useMemo(() => {
    if (!timestamp) return null;
    const mm = moment.unix(timestamp);
    return `${mm.fromNow()} (${mm.format('MMM-DD-YYYY hh:mm:ss a [+UTC]')})`;
  }, [timestamp]);

  return <Box>{fmt}</Box>;
};

export default DateComponent;
