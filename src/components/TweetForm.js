import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


const TweetForm = ({ artistId, setTweets }) => {
  const [tweetBody, setTweetBody] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= 280) {
      setTweetBody(value);
      setError(''); // Clear any previous error when input is valid
    } else {
      setError('Tweet cannot exceed 280 characters.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tweetBody.trim() === '') {
      setError('Tweet cannot be empty.');
      return;
    }

    const newTweet = {
      postId: artistId,
      body: tweetBody,
      userId: artistId,
    };

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/comments', newTweet);
      setTweets((prevTweets) => [{...response.data, uid: uuidv4()}, ...prevTweets]);
      setTweetBody('');
    } catch (error) {
      console.error('Error posting tweet:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Post a Tweet</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              className="form-control"
              value={tweetBody}
              onChange={handleInputChange}
              placeholder="What's on your mind?"
              rows={3}
            />
            {error && <small className="text-danger">{error}</small>}
          </div>
          <button type="submit" className="btn btn-primary mt-3">Tweet</button>
        </form>
      </div>
    </div>
  );
};

export default TweetForm;
