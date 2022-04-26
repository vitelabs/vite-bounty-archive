import React from 'react'
import { tweets } from '../database/tweets'
import profile from '../empty-profile.png'

const VuilderTweets = () => {
    return (
        <div className="tweet-wrap">
            {tweets.map(tweet => (
                <div key={tweet._id} className="tweet">
                    <div>
                        <div className='img-body'>
                            <div className="twitpic-wrap">
                                <img className="twitpic"src={profile} alt="" />
                            </div>
                            <div>{tweet.body}</div>
                        </div>
                        <div className='name-date'>
                            <div>{tweet.name}</div>
                            <div className="tweetdate">{tweet.date}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default VuilderTweets
