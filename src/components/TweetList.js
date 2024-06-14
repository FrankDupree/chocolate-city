import React from 'react';
import axios from 'axios';

const TweetList = ({ tweets, artistId, setTweets }) => {

  const handleDeleteTweet = async (tweet) => {
    if (Object.prototype.hasOwnProperty.call(tweet, 'uid')) {
      var filteredTweets = tweets.filter(t => t.uid !== tweet.uid);
      setTweets(filteredTweets);
    } else {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/comments/${tweet.id}`);
        setTweets(tweets.filter(t => t.id !== tweet.id));
      } catch (error) {
        console.error('Error deleting tweet:', error);
      }
    }
  };
  

  return (
    <div>
      <h2>Tweets</h2>
      <div className="row">
        {tweets.map((tweet) => (
          <div key={tweet.uid || tweet.id} className="col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <p className="card-text">{tweet.body}</p>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTweet(tweet)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TweetList;
