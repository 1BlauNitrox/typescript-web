import { FormEventHandler } from "react";
import { Link } from "react-router-dom";
import React from "react";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const LoginForm = (props: Props) => {
  const { onSubmit } = props;
  return (
    <form onSubmit={onSubmit} className="form">
      <div className="input">
        <label htmlFor="email" className="label">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email Address"
        />
      </div>
      <div className="input">
        <label htmlFor="password" className="label">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Password"
        />
      </div>
      <button type="submit" className="button">Submit</button>
      <Link className="link" to={"/user/register"}>
        Don't have an account? Sign up
      </Link>
    </form>
  );
};

export default LoginForm;
