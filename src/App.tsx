import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Diary } from './pages/Diary';
import { AuthProvider } from './contexts/AuthContext';
import { PublicRoute } from './routes/PublicRoute';
import { PrivateRoute } from './routes/PrivateRoute';
import { DbProvider } from './contexts/DbContext';

function App() {
  return (
    <AuthProvider>
      <DbProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/diarypage"
              element={
                <PrivateRoute>
                  <Diary />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </DbProvider>
    </AuthProvider>
  );
}

export default App;
