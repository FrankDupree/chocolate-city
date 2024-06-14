import React from 'react';
import axios from 'axios';

const TweetList = ({ tweets, artistId, setTweets }) => {

  const handleDeleteTweet = async (tweetId) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/comments/${tweetId}`);
    setTweets(tweets.filter(tweet => tweet.id !== tweetId));
  };

  return (
    <div>
      <h2>Tweets</h2>
      <div className="row">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <p className="card-text">{tweet.body}</p>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTweet(tweet.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TweetList;
