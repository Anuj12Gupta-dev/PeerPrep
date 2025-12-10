import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";

import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage";
import ProblemPage from "./pages/ProblemPage";
import ProblemsPage from "./pages/ProblemsPage";
import SessionPage from "./pages/SessionPage";
import { useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  // this will get rid of the flickering effect
  if (isLoading) return null;

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={!isAuthenticated ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to={"/login"} />} />

        <Route path="/problems" element={isAuthenticated ? <ProblemsPage /> : <Navigate to={"/login"} />} />
        <Route path="/problem/:id" element={isAuthenticated ? <ProblemPage /> : <Navigate to={"/login"} />} />
        <Route path="/session/:id" element={isAuthenticated ? <SessionPage /> : <Navigate to={"/login"} />} />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;