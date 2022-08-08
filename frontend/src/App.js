import React from "react";
import { Route, Routes } from "react-router-dom";

// Components
import AppNavbar from "./components/AppNavbar";

// Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import CreateReview from "./pages/reviews/CreateReview";

function App() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create" element={<CreateReview />} />
      </Routes>
    </>
  );
}

export default App;
