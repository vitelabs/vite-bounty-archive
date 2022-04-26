import React, { useRef, useEffect, useState, useCallback} from 'react';
import QRCode from "react-qr-code";
import Connector from '@vite/connector';
import { type } from 'os';

type Props = {
  uri: string
};
const QR = ({uri} : Props) => {
  return (
    <>
    {uri !== '' ? <QRCode className="rounded-lg" value={uri}></QRCode> : null}
    </>
  );
};

export default QR;
