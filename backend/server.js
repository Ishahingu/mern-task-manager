import { useState } from "react";
import axios from "axios";

// ⚠️ IMPORTANT: No /auth prefix because backend ma nathi
const API = "https://mern-task-manager-esca.onrender.com";

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await axios.post(`${API}/login`, {
          email: form.email,
          password: form.password,
        });

        // Save token
        localStorage.setItem("token", res.data.token);

        // Tell App user logged in
        setUser(true);
      } else {
        await axios.post(`${API}/register`, form);

        alert("Registered successfully! Now login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Invalid credentials or server error");
    }
  };

  return (
    <div className="auth">
      <h2>{isLogin ? "Login" : "Register"}</h2>

      {!isLogin && (
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
      )}

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        {isLogin ? "Login" : "Register"}
      </button>

      <p
        onClick={() => setIsLogin(!isLogin)}
        style={{ cursor: "pointer" }}
      >
        {isLogin
          ? "No account? Register"
          : "Already have account? Login"}
      </p>
    </div>
  );
}

export default Auth;