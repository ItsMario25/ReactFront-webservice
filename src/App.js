import logo from './logo.svg';
import './App.css';
import Welcome from './components/welcome';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Contact from './pages/Contact';
import Aboutme from './pages/Aboutme';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Welcome message="Hola perros" />
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/contact">Contactos</Link>
              </li>
              <li>
              <Link to="/aboutme">About me</Link>
              </li>
              <li>
              <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </div>
          <Routes>
            <Route path='/contact' element={<Contact />}></Route>
            <Route path='/aboutme' element={<Aboutme />}></Route>
            <Route path='/profile/:name' element={<Profile />}></Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
