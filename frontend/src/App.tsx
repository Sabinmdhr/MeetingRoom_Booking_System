import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import CreatePassword from './pages/CreatePassword';
import VerifyPassword from './pages/VerifyPassword';

import Dashboard from "./components/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={ <Dashboard /> } />
        <Route path="/verify-password" element={<VerifyPassword />} />
        <Route path="/create-password" element={<CreatePassword />} />
      </Routes>
    </BrowserRouter>
  );


}

export default App;
