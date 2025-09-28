import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import UsersListPage from './pages/UsersListPage';
import PrivateRoute from './components/layout/PrivateRoute';

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/users" /> : <LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/users" element={<UsersListPage />} />
        </Route>
        <Route path="*" element={<Navigate to={token ? "/users" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;