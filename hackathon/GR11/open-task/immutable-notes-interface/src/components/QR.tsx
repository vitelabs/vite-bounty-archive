import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'qrcode';

const QR = React.memo(
  ({
    data,
    ...rest
  }: React.HTMLProps<HTMLDivElement> & {
    data: string;
  }) => {
    const [src, srcSet] = useState('');

    const mountedRef = useRef(true);
    useEffect(
      () => () => {
        mountedRef.current = false;
      },
      []
    );

    useEffect(() => {
      QRCode.toString(data, { type: 'svg', margin: 0 }).then(
        (url: string) => {
          if (mountedRef.current) {
            srcSet(url);
          }
        },
        (e) => window.alert('QR error: ' + JSON.stringify(e))
      );
    }, [data]);

    return (
      <div
        {...{
          dangerouslySetInnerHTML: { __html: src },
        }}
        {...rest}
      />
    );
  }
);

export default QR;
