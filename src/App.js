import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import PrivateRouteStudent from "./components/PrivateRouteStudent";
import PublicRoute from "./components/PublicRoute";
import AuthenticationCheck from "./components/ui/loaders/AuthenticationCheck";
import useAuthCheck from "./hooks/useAuthCheck";
import Assignment from "./pages/admin/Assignment";
import AssignmentMark from "./pages/admin/AssignmentMark";
import Dashboard from "./pages/admin/Dashboard";
import LoginAdmin from "./pages/admin/LoginAdmin";
import Quizzes from "./pages/admin/Quizzes";
import Videos from "./pages/admin/Videos";
import CoursePlayer from "./pages/student/CoursePlayer";
import Leaderboard from "./pages/student/Leaderboard";
import LoginStudent from "./pages/student/LoginStudent";
import Quiz from "./pages/student/Quiz";
import RegistrationStudent from "./pages/student/RegistrationStudent";

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <AuthenticationCheck />
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginStudent />
            </PublicRoute>
          }
        />
        <Route
          path="/registration"
          element={
            <PublicRoute>
              <RegistrationStudent />
            </PublicRoute>
          }
        />

        <Route
          path="/courses/:videoId?"
          element={
            <PrivateRouteStudent>
              <CoursePlayer />
            </PrivateRouteStudent>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRouteStudent>
              <Leaderboard />
            </PrivateRouteStudent>
          }
        />
        <Route
          path="/quiz/:quizId"
          element={
            <PrivateRouteStudent>
              <Quiz />
            </PrivateRouteStudent>
          }
        />
        <Route
          path="/admin"
          element={
            <PublicRoute>
              <LoginAdmin />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/assignment"
          element={
            <PrivateRouteAdmin>
              <Assignment />
            </PrivateRouteAdmin>
          }
        />

        <Route
          path="/admin/marks"
          element={
            <PrivateRouteAdmin>
              <AssignmentMark />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/quizzes"
          element={
            <PrivateRouteAdmin>
              <Quizzes />
            </PrivateRouteAdmin>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRouteAdmin>
              <Dashboard />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <PrivateRouteAdmin>
              <Videos />
            </PrivateRouteAdmin>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
