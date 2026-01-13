import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// 1. The Blue Pin / Map Feature (usually on Home)
import Home from './pages/Home';

// 2. The Login Feature
import Login from './pages/Login';
import DonorRegister from './pages/DonorRegister';
import BloodBankRegister from './pages/BloodBankRegister';
import BloodBankDashboard from './pages/BloodBankDashboard';
import DonorDashboard from './pages/DonorDashboard';
import BloodBankLogin from './pages/BloodBankLogin';

// 3. The Emergency Button Feature
import Emergency from './pages/Emergency';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the Blue Pin Map (Home) */}
          <Route path="/" element={<Home />} />

          {/* Routes for Login & Donors */}
          <Route path="/login" element={<Login />} />
          <Route path="/bank-login" element={<BloodBankLogin />} />
          <Route path="/register-donor" element={<DonorRegister />} />
          <Route path="/register-bank" element={<BloodBankRegister />} />
          <Route path="/dashboard" element={<DonorDashboard />} />
          <Route path="/bank-dashboard" element={<BloodBankDashboard />} />

          {/* Route for the Emergency Button */}
          <Route path="/emergency" element={<Emergency />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;