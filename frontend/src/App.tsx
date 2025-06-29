import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Transaction from './pages/Transaction';
import Personal from './pages/Personal';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import Wallet from './pages/Wallet';
import Message from './pages/Message';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/setting" element={<Settings />} />
            <Route path="/analytics" element={<Analytics/>} />
            <Route path="/message" element={<Message />} />
            <Route path="/wallet" element={<Wallet/>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;