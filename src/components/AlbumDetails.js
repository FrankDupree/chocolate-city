import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AlbumDetails = () => {
  const { artistId, albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [artist, setArtist] = useState({});
  const [album, setAlbum] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const photosPerPage = 10;

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
      setPhotos(response.data);
    };

    const fetchArtist = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${artistId}`);
      setArtist(response.data);
    };

    const fetchAlbum = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
      setAlbum(response.data);
    };

    fetchArtist();
    fetchPhotos();
    fetchAlbum();
  }, [albumId]);

  
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);


  const totalPages = Math.ceil(photos.length / photosPerPage);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const truncateTitle = (title) => {
    const words = title.split(' ');
    const randomWords = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur'];
  
    while (words.length < 6) {
      const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
      words.push(randomWord);
    }
  
    if (words.length > 6) {
      return words.slice(0, 6).join(' ') + '...';
    }
  
    return words.join(' ');
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2>{artist.name}</h2>
          <h4 className="fst-italic lead">{album.title}</h4>
        </div>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
      </div>
      <h3 className='mt-5'>Album Photos</h3>
      <div className="row">
        {currentPhotos.map((photo) => (
          <div key={photo.id} className="col-md-3">
            <div className="card mb-3">
              <img src={photo.thumbnailUrl} className="card-img-top" alt={photo.title} />
              <div className="card-body">
                <h5 className="card-title">{truncateTitle(photo.title)}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          handlePageChange={handlePageChange} 
        />
      </div>
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

export default AlbumDetails;
