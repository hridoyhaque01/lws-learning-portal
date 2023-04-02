import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "../../features/auth/authApi";
import SubmitButton from "../ui/SubmitButton";
import TextInput from "../ui/TextInput";
import TextLink from "../ui/TextLink";

export default function SigninForm({ user }) {
  const [adminLogin, { data: adminData, error: responseError }] =
    useAdminLoginMutation();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === "admin") {
      adminLogin(data);
    }
  };

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    } else if (adminData?.accessToken && adminData?.user) {
      navigate("/admin/dashboard");
    }
  }, [adminData, responseError, navigate]);

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

      {error !== "" && <div>{error}</div>}
    </form>
  );
}
