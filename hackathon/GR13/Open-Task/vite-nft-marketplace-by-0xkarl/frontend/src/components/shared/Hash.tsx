import React, { FC, useMemo } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useViteProvider } from '@react-vite';

const useStyles = makeStyles((theme) => ({
  container: {
    color: '#006fe9 !important',
  },
}));

const Hash: FC<{ hash: string }> = ({ hash }) => {
  const { baseBlockexplorerUrl } = useViteProvider();
  const classes = useStyles();

  const blockExplorerLink = useMemo(
    () => `${baseBlockexplorerUrl}/tx/${hash}`,
    [hash, baseBlockexplorerUrl]
  );

  return (
    <a
      href={blockExplorerLink}
      className={clsx('flex items-center', classes.container)}
      target='_blank'
      rel='noreferrer'
    >
      <Box mr={2}>{hash}</Box>
    </a>
  );
};

export default Hash;
