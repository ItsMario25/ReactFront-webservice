import logo from './logo.svg';
import './App.css';
import Welcome from './components/welcome';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';

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
            </ul>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
