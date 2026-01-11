import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import DonorRegister from './pages/DonorRegister'; // We will create this next
import Emergency from './pages/Emergency'; // We will create this next

function App() {
  return (
    <Router>
      <div className="app-container">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register-donor" element={<DonorRegister />} />
            <Route path="/emergency" element={<Emergency />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
