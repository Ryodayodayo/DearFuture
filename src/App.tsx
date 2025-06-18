import React from 'react';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { DashBoard } from "./pages/DashBoard"
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { PublicRoute } from './routes/PublicRoute';
import { PrivateRoute } from './routes/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home />}/>

          <Route path = "/signup" element = {
            <PublicRoute>
              <Signup />
            </PublicRoute>}/>

          <Route path = "/login" element = {
            <PublicRoute>
              <Login />
            </PublicRoute>}/>

          <Route path = "/dashboard" element = {
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>}/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
