import { useEffect, useState } from "react";
import axios from "axios";

export default function RewardsSection() {
  const [rewards, setRewards] = useState({ points: 0, badge: "Bronze" });
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;
    axios
      .get(`http://localhost:5000/user/${user.id}/rewards`)
      .then((res) => setRewards(res.data))
      .catch((err) => console.error("Error loading rewards:", err));
  }, []);

  const badgeStyles = {
    Gold: "bg-yellow-400 text-yellow-900",
    Silver: "bg-gray-300 text-gray-800",
    Bronze: "bg-orange-300 text-orange-900",
  };

  return (
    <div className="bg-white shadow p-6 rounded-md mt-8 text-center max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700">🎖 Your Rewards</h2>
      <p className="mt-2 text-lg text-gray-700">
        You've earned <strong>{rewards.points}</strong> points!
      </p>

      <div
        className={`inline-block mt-4 px-5 py-2 rounded-full text-lg font-semibold ${badgeStyles[rewards.badge]}`}
      >
        🏅 {rewards.badge} Badge
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Raise issues, earn points, and climb up the badge ladder!
      </div>
    </div>
  );
}
