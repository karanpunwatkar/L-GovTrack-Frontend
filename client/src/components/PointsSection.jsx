import { useEffect, useState } from "react";
import axios from "axios";

export default function PointsSection() {
  const [points, setPoints] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;
    axios
      .get(`http://localhost:5000/user/${user.id}/rewards`)
      .then((res) => setPoints(res.data.points))
      .catch((err) => console.error("Error fetching points:", err));
  }, []);

  return (
    <div className="bg-white shadow p-6 rounded-md mt-8 text-center max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-700 mb-2">⭐ Points</h2>
      <p className="text-lg text-gray-700">
        You have <span className="text-blue-600 font-semibold text-xl">{points}</span> points!
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Points are earned by raising complaints and helping improve your community.
      </p>
    </div>
  );
}
