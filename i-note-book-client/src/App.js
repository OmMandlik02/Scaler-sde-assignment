import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import NotesState from './contexts/NotesState';
import Alert from './components/Alert';
import NotesContext from './contexts/NotesContext';
const App = () => {
  return (
    <NotesState>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Home />}>
            </Route>
          </Routes>
        </div>
      </Router>
    </NotesState>
  );
}

export default App;
