import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authApi";
import useAuth from "../../hooks/useAuth";
import SubmitButton from "../ui/SubmitButton";
import TextInput from "../ui/TextInput";
import TextLink from "../ui/TextLink";
import Error from "../ui/errors/Error";

export default function SignupForm() {
  const [register, { error: responseError, isError, isLoading }] =
    useRegisterMutation();
  const [error, setError] = useState("");
  const checkRole = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setError("password does not match");
    } else {
      register({
        name: data.name,
        email: data.email,
        password: data.password,
        role: "student",
      });
    }
  };

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
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <TextInput
            type="text"
            id="username"
            autoComplete="name"
            placeholder="Student Name"
            title="Student Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div>
          <TextInput
            id="email-address"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            title="Email address"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div>
          <TextInput
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            title="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div>
          <TextInput
            id="confirm-password"
            type="password"
            autoComplete="confirm-password"
            placeholder="Confirm Password"
            title="Confirm Password"
            lastInput={true}
            value={data.confirmPassword}
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <TextLink link="/" name="log in" />
      </div>

      <div>
        <SubmitButton disabled={isLoading} name="Create Account" />
      </div>
      {/* {error?.trim().length > 0 && <Error bg="error" message={error} />} */}
      {isError && <Error bg="error" message={responseError} />}
    </form>
  );
}
