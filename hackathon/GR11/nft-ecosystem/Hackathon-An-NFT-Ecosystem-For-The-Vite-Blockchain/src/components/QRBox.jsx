import React, { useState, useEffect } from 'react';
import qrcode from 'qrcode-generator/qrcode.js'

const QRBox = ({qrdata}) => {
   
   const [imgTag, setImgTag] = useState('')
   const getQR = (qrdata) => {

        const typeNumber = 0;
          const errorCorrectionLevel = 'M';
          const cellSize = 4;
          const qr = qrcode(typeNumber, errorCorrectionLevel);
          console.log('QRDATA',qrdata);
          qr.addData(qrdata);
          qr.make();
          const img = qr.createDataURL(cellSize);
          console.log(img);
          setImgTag(img);

    }
    
    useEffect(() => {
        getQR(qrdata);
      }, [])
      
    return (
        <div>
            { imgTag.length > 0
              ?  <img src={imgTag}/>
              : null}
        </div>
    );
};

export default QRBox;