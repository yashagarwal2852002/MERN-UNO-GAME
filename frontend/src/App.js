import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginSignUpPage from './Pages/LoginSignUpPage';
import GamePage from './Pages/GamePage';
import GamePlayPage from './Pages/GamePlayPage';
import demo from './Pages/demo';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" Component={LoginSignUpPage} />
        <Route path="/game" Component={GamePage} />
        <Route path="/getGame" Component={GamePlayPage} />
        <Route path="/demo" Component={demo} />
      </Routes>
    </div>
  );
}

export default App;
