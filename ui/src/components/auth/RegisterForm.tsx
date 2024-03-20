import { FormEventHandler } from "react";
import { Link } from "react-router-dom";
import React from "react";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const RegisterForm = (props: Props) => {
  const { onSubmit } = props;
  return (
    <form onSubmit={onSubmit} className="form">
      <div className="input">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Full Name"
        />
      </div>
      <div className="input">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email Address"
        />
      </div>
      <div className="input">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Password"
        />
      </div>
      <button type="submit">Submit</button>
      <Link className="link" to={"/user/login"}>
        Already have an account? Sign in
      </Link>
    </form>
  );
};

export default RegisterForm;