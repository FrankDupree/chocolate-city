import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArtistList from './components/ArtistList';
import AlbumList from './components/AlbumList';
import AlbumDetails from './components/AlbumDetails';
import ArtistDetails from './components/ArtistDetails';
import Tweets from './components/Tweets';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/artists" element={<ArtistList />} />
          <Route path="/artists/:id" element={<ArtistDetails />} />
          <Route path="/artists/:artistId/albums" element={<AlbumList />} />
          <Route path="/artists/:artistId/albums/:albumId" element={<AlbumDetails />} />
          <Route path="/artists/:artistId/tweets" element={<Tweets />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
