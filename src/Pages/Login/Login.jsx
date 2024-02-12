import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [token, setToken] = useState(null);

  const { setIsLoggedIn } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://bazaar-buzz.onrender.com/auth/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const responseData = await response.json();
      const authToken = responseData.token;

      localStorage.setItem("token", authToken);
      localStorage.setItem("user_id", responseData.user_id);
      // setToken(authToken);
      setUsername("");
      setPassword("");
      setIsLoggedIn(true);
      window.location.href = "/profile";
      alert("Login successful");
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch("https://bazaar-buzz.onrender.com/auth/logout/", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Logout failed");
  //     }
  //     localStorage.removeItem("token");
  //     setToken(null);
  //     console.log("Logged out");
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //   }
  // };

  return (
    <div>
      <div className="w-50 mx-auto">
        <h1 className="text-center mb-5">Sign In</h1>
        {error && <p className="text-danger">{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter Username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>

        <p className="mt-3">
          {"Don't"} have account? <Link to={"/signup/"}> Sign up </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
