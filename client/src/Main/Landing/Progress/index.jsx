import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserId } from "../../../Utils/getUserId";

const UserProgress = () => {
  const [progress, setProgress] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const userId = getUserId();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/progress`, { params: { email: userId } })
      .then((res) => setProgress(res.data))
      .catch((err) => console.error("Failed to fetch progress", err));
  }, [BASE_URL, userId]);

  if (!progress) {
    return (
      <div className="text-center text-gray-400 mt-10">Loading progress...</div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-4">Your Learning Progress</h2>

      {/* Current Streak */}
      <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-4 rounded-xl border border-orange-500/20 mb-4">
        <p className="text-lg">🔥 Current Streak</p>
        <h3 className="text-4xl font-bold">{progress.streak} days</h3>
      </div>

      {/* Total Questions */}
      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 rounded-xl border border-blue-500/20 mb-4">
        <p className="text-lg">📚 Total Questions Completed</p>
        <h3 className="text-4xl font-bold">{progress.totalQuestions}</h3>
      </div>

      {/* Badges */}
      <div className="bg-gradient-to-br from-yellow-500/20 to-pink-500/20 p-4 rounded-xl border border-yellow-500/20">
        <p className="text-lg">🏆 Badges Earned</p>
        {progress.badges.length === 0 ? (
          <p className="text-gray-400 text-sm mt-2">
            No badges yet. Keep learning!
          </p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">
            {progress.badges.map((badge, idx) => (
              <span
                key={idx}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-sm px-3 py-1 rounded-full font-semibold shadow"
              >
                {badge.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProgress;
