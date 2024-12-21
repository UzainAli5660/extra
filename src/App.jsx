// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SeeQuizPage from './pages/SeeQuizPage';
import PlayQuizPage from "./pages/PlayQuizPage";
import ResultPage from "./pages/ResultPage";

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/see-quiz" element={<SeeQuizPage />} />
        <Route path="/play-quiz" element={<PlayQuizPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
