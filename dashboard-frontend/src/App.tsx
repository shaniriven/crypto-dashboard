import { Route, Routes } from "react-router-dom";
import AuthTabs from "./pages/auth/AuthTabs";
import Dashboard from "./pages/dashboard";
import OnboardingPage from "./pages/onboarding";
// import SignupPage from "./pages/SignupPage";
// import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthTabs />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
}
