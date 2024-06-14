import React, { useState } from 'react';
import axios from 'axios';

const Tweet = ({ tweet, setTweets, tweets }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(tweet.body);

  const handleUpdateTweet = async () => {
    if (editedBody.trim()) {
      if (Object.prototype.hasOwnProperty.call(tweet, 'uid')) {
        
        // Manually update the tweet if the 'uid' property exists
        const updatedTweet = { ...tweet, body: editedBody };
        setTweets(tweets.map(t => (t.uid === tweet.uid ? updatedTweet : t)));

      } else {
        // Update the tweet via API if 'uid' property does not exist
        try {
          const response = await axios.put(`https://jsonplaceholder.typicode.com/comments/${tweet.id}`, {
            ...tweet,
            body: editedBody,
          });
          setTweets(tweets.map(t => (t.id === tweet.id ? response.data : t)));
        } catch (error) {
          console.error('Error updating tweet:', error);
        }
      }
  
      setIsEditing(false);
    }
  };
  


  const handleDeleteTweet = async () => {
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
    <div className="list-group-item">
      {isEditing ? (
        <div>
          <textarea
            className="form-control"
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
          <button className="btn btn-success btn-sm mt-2" onClick={handleUpdateTweet}>Update</button>
          <button className="btn btn-secondary btn-sm mt-2 ms-2" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{tweet.body}</p>
          <button className="btn btn-warning btn-sm" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="btn btn-danger btn-sm ms-2" onClick={handleDeleteTweet}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Tweet;
