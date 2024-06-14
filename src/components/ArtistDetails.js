import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import axios from 'axios';
import AlbumList from './AlbumList';
import TweetList from './TweetList';
import TweetForm from './TweetForm';
import { Link } from 'react-router-dom';


const ArtistDetails = () => {
  const { id } = useParams();

  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchArtist = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setArtist(response.data);
    };


    const fetchTweets = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
      setTweets(response.data);
    };

    fetchArtist();
    fetchTweets();
  }, [id]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2>{artist.name}</h2>
          <p className="fst-italic lead">{artist.email}</p>
        </div>
        <Link className="btn btn-success" to={`/artists/${id}/tweets`}>TWEETS</Link>
      </div>


      <AlbumList />
      <TweetList tweets={tweets} artistId={artist.id} setTweets={setTweets} />
      <TweetForm artistId={artist.id} setTweets={setTweets} />
    </div>
  );
};

export default ArtistDetails;
