import React from 'react';
import { useHistory } from 'react-router-dom';
const EventInfo = ({event}) => {

    const router = useHistory();
   

    return (
        <div onClick={() => router.push(`/mytokens`)}>
            <h2 style={{marginLeft: '0%'}}>{event.log}</h2>
            <h3 className="boxed">From:   {event._from}</h3>
            <h3 className="boxed">To:  {event._to}</h3>
            <h3 className="boxed">Id: {event._tokenId}</h3>
        </div>
    );
};

export default EventInfo;