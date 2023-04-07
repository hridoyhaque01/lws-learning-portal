import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import learningProtal from "../assets/image/learningportal.svg";
import { selectName } from "../features/auth/authSelectors";
import { userLoggedOut } from "../features/auth/authSlice";
import useAuth from "../hooks/useAuth";

export default function Navigation({ navigate }) {
  const role = useAuth();
  const name = useSelector(selectName);
  const dispatch = useDispatch();

  const handleUser = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };

  return (
    <nav className="shadow-md">
      <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
        <Link to={role === "admin" ? "/admin/dashboard" : "/courses"}>
          <img className="h-10" src={learningProtal} alt="learning portal" />
        </Link>
        <div className="flex items-center gap-3">
          {role === "student" && !navigate && (
            <Link to="/leaderboard" className="font-bold">
              Leaderboard
            </Link>
          )}

          <h2 className={`${role === "admin" && "font-bold"}`}>{name}</h2>
          <button
            type="button"
            onClick={handleUser}
            className={`flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all ${
              role === "admin"
                ? "bg-red-600 hover:bg-red-700 font-medium"
                : "border border-cyan hover:bg-cyan"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
