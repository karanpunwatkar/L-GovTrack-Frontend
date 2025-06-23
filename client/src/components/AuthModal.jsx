import { useState } from "react";
import axios from "axios";

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? "/auth/login" : "/auth/signup";
      const res = await axios.post(`http://localhost:5000${url}`, form);

      alert("✅ Success!");

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(res.data)); // ✅ FIXED
      onClose();
      window.location.reload(); // ✅ Refresh for points, rewards, etc.
    } catch (err) {
      alert("❌ Error: " + err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              className="border p-2 rounded w-full"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded w-full"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded w-full"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="mt-3 text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
