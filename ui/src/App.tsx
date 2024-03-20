import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import AuthContext from "./store/auth/AuthContextProvider";
import { useContext } from "react";
import Resource from "./components/resource/Resource";
import Auth from "./components/auth/Auth";
import "./App.css";

function App() {
  const { authState } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={authState.isLoggedIn ? location.pathname : "/user/login"}
            />
          }
        />
        {!authState.isLoggedIn && (
          <Route path="user">
            <Route path="register" element={<Auth />} />
            <Route path="login" element={<Auth />} />
          </Route>
        )}
        {authState.isLoggedIn && (
          <Route path="resource" element={<Resource />} />
        )}
      </Routes>
    </div>
  );
}

export default App;