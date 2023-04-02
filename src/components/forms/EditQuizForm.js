import React from "react";
import SubmitButton from "../ui/SubmitButton";
import TextInput from "../ui/TextInput";

export default function EditQuizForm() {
  return (
    <form className="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="name"
            autoComplete="name"
            required
            className="login-input rounded-t-md"
            placeholder="Student Name"
          />
        </div>
        <div>
          <TextInput
            id="email-address"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            title="Email address"
          />
        </div>
        <div>
          <TextInput
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            title="Password"
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
          />
        </div>
      </div>

      <div>
        <SubmitButton name="Create Account" />
      </div>
    </form>
  );
}
