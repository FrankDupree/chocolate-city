import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TweetForm from './TweetForm';
import Tweet from './Tweet';

const Tweets = () => {
  const { artistId } = useParams();
  const [tweets, setTweets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tweetsPerPage = 5;

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${artistId}`);
      setTweets(response.data);
    };
    fetchTweets();
  }, [artistId]);

  const indexOfLastTweet = currentPage * tweetsPerPage;
  const indexOfFirstTweet = indexOfLastTweet - tweetsPerPage;
  const currentTweets = tweets.slice(indexOfFirstTweet, indexOfLastTweet);
  const totalPages = Math.ceil(tweets.length / tweetsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h3>Tweets</h3>
      <div className="mb-3">
        <TweetForm artistId={artistId} setTweets={setTweets} />
      </div>
      <div className="list-group">
        {currentTweets.map(tweet => (
          <Tweet key={tweet.id} tweet={tweet} setTweets={setTweets} tweets={tweets} />
        ))}
      </div>
      {currentTweets.length > 0 && <div className="mt-3">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>}
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(number)}>
              {number}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </li>
      </ul>
    </nav>
  );
};

export default Tweets;
