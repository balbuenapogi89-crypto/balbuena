import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (
      username === "admin" &&
      password === "admin1234"
    ) {

      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");

    } else {

      alert("Invalid username or password!");

    }

  };

  return (

    <div className="login-page">

      <div className="login-box">

        <h1>NovaHR Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>

  );

}

export default Login;