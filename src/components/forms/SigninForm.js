import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import { selectError } from "../../features/auth/authSelectors";
import useAuth from "../../hooks/useAuth";
import Error from "../ui/errors/Error";
import SubmitButton from "../ui/inputes/SubmitButton";
import TextInput from "../ui/inputes/TextInput";
import TextLink from "../ui/inputes/TextLink";

export default function SigninForm({ user }) {
  const [login, { error: responseError }] = useLoginMutation();
  const checkRole = useAuth();
  const loginError = useSelector(selectError);

  // manage local states

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //handle form submit

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = user === "admin" ? "admin" : "student";
    login({ data, role });
  };

  //check error and redicrect if it's not

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError?.data);
    } else if (checkRole === "admin") {
      navigate("/admin/dashboard");
    } else if (checkRole === "student") {
      navigate("/courses");
    }
  }, [checkRole, responseError, navigate]);

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <TextInput
            type="email"
            id="email-address"
            autoComplete="email"
            placeholder="Email address"
            title="Email address"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div>
          <TextInput
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="Password"
            title="Password"
            lastInput={true}
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        {user === "admin" ? (
          <TextLink link="/admin" name="Forgot your password?" />
        ) : (
          <TextLink link="/registration" name="Create New Account" />
        )}
      </div>
      <div>
        <SubmitButton name="Sign in" />
      </div>

      {error !== "" && <Error bg="error" message={error} />}
      {loginError !== "" && <Error bg="error" message={loginError} />}
    </form>
  );
}
