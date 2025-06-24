import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // redirect to home
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-700">L-GovTrack</h1>
          <div className="hidden md:flex space-x-6 items-center">
            <a href="/points" target="_blank" className="hover:text-blue-600">⭐ Points</a>
            <a href="/rewards" target="_blank" className="hover:text-blue-600">🎖 Rewards</a>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-green-600 font-medium">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="text-blue-600 hover:underline"
              >
                👤 Login / Signup
              </button>
            )}
          </div>
        </div>
      </nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
