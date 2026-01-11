import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import DonorRegister from './pages/DonorRegister';
import Emergency from './pages/Emergency';
import Login from './pages/Login';
import DonorDashboard from './pages/DonorDashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register-donor" element={<DonorRegister />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DonorDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
