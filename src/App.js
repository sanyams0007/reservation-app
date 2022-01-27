import "./App.css";
import PlanJourney from "./components/PlanJourney";
import Dashboard from "./components/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
//import { useAuth } from "./contexts/AuthContext";
import RegisterScreen from "./components/Register";
import LoginScreen from "./components/Login";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import { useAuth } from "./contexts/AuthContext";

//const PlanJourneyWithContainer = HOCContainer(PlanJourney);

export default function App() {
  const {
    auth: { user },
  } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route
            path="/"
            element={
              user?.role === "admin" ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/plan" />
              )
            }
          />
          <Route path="plan" element={<PlanJourney />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* <Route path="admin" element={<RegisterScreen />} /> */}

        <Route path="*" element={() => <h1>Nothing here..</h1>} />
      </Route>
    </Routes>
  );
}
