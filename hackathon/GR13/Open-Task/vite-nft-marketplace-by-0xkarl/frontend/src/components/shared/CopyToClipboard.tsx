import React, { FC, ReactNode, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CopyIcon from '@material-ui/icons/FileCopy';
import CopiedIcon from '@material-ui/icons/Check';
import clsx from 'clsx';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme) => {
  return {
    container: {
      '& span': {
        opacity: '0',
      },
      '&:hover span': {
        opacity: '1',
      },
    },
  };
});

const CopyToClipboardContainer: FC<{ text?: string; children: ReactNode }> = ({
  text,
  children,
}) => {
  const classes = useStyles();
  const [copied, setCopied] = useState<boolean>(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Box
      className={clsx(classes.container, 'flex items-center cursor-pointer')}
    >
      <Box mr={1}>{children}</Box>
      {!text ? null : (
        <CopyToClipboard {...{ text, onCopy }}>
          <Box component='span' className='flex items-center'>
            {copied === true ? (
              <CopiedIcon fontSize={'small'} color='primary' />
            ) : (
              <CopyIcon fontSize={'small'} color='primary' />
            )}
          </Box>
        </CopyToClipboard>
      )}
    </Box>
  );
};

export default CopyToClipboardContainer;
