import React from 'react';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Login } from "./pages/Login"
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home />}/>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
