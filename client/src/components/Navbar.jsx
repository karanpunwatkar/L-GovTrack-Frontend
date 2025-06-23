import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import axios from "axios";

export default function Navbar() {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);

      // Fetch user's points
      axios
        .get(`http://localhost:5000/user/${parsed.id}/rewards`)
        .then((res) => setPoints(res.data.points))
        .catch((err) => console.error("Error fetching navbar points", err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-700">L-GovTrack</h1>
          <div className="hidden md:flex space-x-6 items-center">
            
            <a href="/rewards" target="_blank" className="hover:text-blue-600">
              🎖 Rewards
            </a>

            {user ? (
                
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  ⭐ Points: <span className="font-semibold text-blue-600">{points}</span>
                </span>
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
