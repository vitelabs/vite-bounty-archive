import React from 'react'

const Tweet = (props) => {
    return (
        <div>
            <div className='img-body'>
                <div className="twitpic-wrap">
                    <img className="main-twitpic" src={props.tweet.image} alt="" />
                </div>
                <div className='tweet-body'>{props.tweet.body}</div>
            </div>
            <div className='name-date'>
                <div>{props.tweet.name}</div>
                <div className="tweetdate">{props.tweet.date}</div>
            </div>
        </div>
    )
}

export default Tweet
