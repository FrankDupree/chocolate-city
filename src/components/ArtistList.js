import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ArtistList = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setArtists(response.data);
    };

    fetchArtists();
  }, []);

  return (
    <div>
      <h2>Artists</h2>
      <div className="list-group">
        {artists.map((artist) => (
          <Link
            key={artist.id}
            className="list-group-item list-group-item-action"
            to={`/artists/${artist.id}`}
          >
            {artist.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
