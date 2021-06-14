import React, { useContext, useEffect, useState } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
  console.log('you are on the register page');
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
      // redirect to main
    }

    if (error === "User already exists!") {
      setAlert(error, "danger");
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    website: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2, lastname, firstname, website, affiliation} = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "" 
    || lastname === "" || firstname === "" || website === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      console.log("Register Submit");
    }
    console.log(user);
    console.log({
      username,
      firstname,
      lastname,
      website,
      email,
      password,
      affiliation,
    });
    register({
      username,
      firstname,
      lastname,
      website,
      email,
      password,
      affiliation,
    });
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="affiliation">Affiliation</label>
            <input
              type="text"
              name="affiliation"
              value={affiliation}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              name="website"
              value={website}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              required
              minLength="6"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
              required
              minLength="6"
            />
          </div>
          <input
            type="submit"
            value="register"
            className="btn btn-primary btn-block btn-press"
          />
        </form>
      </h1>
    </div>
  );
};

// beef picante / medium spicy
export default Register;