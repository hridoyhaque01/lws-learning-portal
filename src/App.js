import React from "react";
import AdminLogin from "./pages/admin/AdminLogin";
import Assignment from "./pages/admin/Assignment";
import AssignmentMark from "./pages/admin/AssignmentMark";
import Dashboard from "./pages/admin/Dashboard";
import EditAssignment from "./pages/admin/EditAssignment";
import EditQuiz from "./pages/admin/EditQuiz";
import EditVideo from "./pages/admin/EditVideo";
import Quizzes from "./pages/admin/Quizzes";
import Videos from "./pages/admin/Videos";
import CoursePlayer from "./pages/student/CoursePlayer";
import Leaderboard from "./pages/student/Leaderboard";
import Quiz from "./pages/student/Quiz";
import StudentLogin from "./pages/student/StudentLogin";
import StudentRegistration from "./pages/student/StudentRegistration";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import PublicRoute from "./components/PublicRoute";
import StudentPrivateRoute from "./components/StudentPrivateRoute";
import AuthenticationCheck from "./components/ui/loaders/AuthenticationCheck";
import useAuthCheck from "./hooks/useAuthCheck";

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
              <StudentLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/registration"
          element={
            <PublicRoute>
              <StudentRegistration />
            </PublicRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <StudentPrivateRoute>
              <CoursePlayer />
            </StudentPrivateRoute>
          }
        />
        <Route
          path="/courses/:videoId"
          element={
            <StudentPrivateRoute>
              <CoursePlayer />
            </StudentPrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <StudentPrivateRoute>
              <Leaderboard />
            </StudentPrivateRoute>
          }
        />
        <Route
          path="/quiz/:id"
          element={
            <StudentPrivateRoute>
              <Quiz />
            </StudentPrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/assignment"
          element={
            <AdminPrivateRoute>
              <Assignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignment/:id"
          element={
            <AdminPrivateRoute>
              <EditAssignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/marks"
          element={
            <AdminPrivateRoute>
              <AssignmentMark />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/quizzes"
          element={
            <AdminPrivateRoute>
              <Quizzes />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/quizzes/:idc"
          element={
            <AdminPrivateRoute>
              <EditQuiz />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <Dashboard />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <AdminPrivateRoute>
              <Videos />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos/:id"
          element={
            <AdminPrivateRoute>
              <EditVideo />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
