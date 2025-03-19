import Home from "./app/page"
import HowItWorks from "./components/how-it-works"
import Leaderboard from "./components/leaderboard"


import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Define the possible user roles
type UserRole = "Auctioneer" | "Bidder" | "Superadmin";

// Define the user type
interface User {
  id: string;
  role: UserRole;
}

// Fetch user data (example: from localStorage)
const storedUser = localStorage.getItem("user");
const user: User | null = storedUser ? JSON.parse(storedUser) : null;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works-info" element={<HowItWorks />} />
        <Route path="/leaderboard" element={<Leaderboard />} />

        {/* Protected Routes 
        <Route element={<ProtectedRoute user={user} allowedRoles={["Auctioneer"]} />}>
          <Route path="/submit-commission" element={<SubmitCommission />} />
        </Route>*/}

        {/* Add more protected routes for other roles as needed */}
      </Routes>
    </Router>
  );
};

export default App;
