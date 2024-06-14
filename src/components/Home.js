import React from 'react';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const images = [
    'artists.png',
    'artist_detail.png',
    'artist_detail_1.png',
    'artist_detail_2.png',
  ];
  
  return (
    <div>
      <h1>Welcome to Chocolate City</h1>
      <p>Explore the artists and their work.</p>

      <h2 className='fst-italic lead fs-2'>UI Screens</h2>
      <div className="row">
        {images.map((image, index) => (
          <div key={index} className="col-md-6 mb-4">
            <div className="card">
              <img src={image} className="card-img-top custom-img" alt="Sample" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
