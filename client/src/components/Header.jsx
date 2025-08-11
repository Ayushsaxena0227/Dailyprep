import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getUserId } from "../Utils/getUserId";
import { Flame, User } from "lucide-react";
import { toast } from "sonner";

const Header = ({ showModal }) => {
  const [progress, setProgress] = useState(null);
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [newBadge, setNewBadge] = useState(false);

  const dropdownRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const userId = getUserId();
  const prevStreak = useRef(0);
  const prevBadges = useRef([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/progress`, { params: { email: userId } })
      .then((res) => {
        setProgress(res.data);

        if (res.data.streak > prevStreak.current) {
          setPulse(true);
          setTimeout(() => setPulse(false), 2000);
          prevStreak.current = res.data.streak;
        } else {
          prevStreak.current = res.data.streak;
        }

        if (res.data.badges.length > prevBadges.current.length) {
          setNewBadge(true);
          prevBadges.current = res.data.badges;
        } else {
          prevBadges.current = res.data.badges;
        }
      })
      .catch((err) => console.error("Failed to fetch progress", err));
  }, [BASE_URL, userId]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-md lg:text-xl sm:font-normal lg:font-semibold">
            Prepin10
          </h1>

          <div className="flex items-center space-x-4">
            <button
              onClick={showModal}
              className="cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700
              px-3 py-1 text-xs rounded-full font-medium transition-all duration-300 transform hover:scale-105
              sm:px-6 sm:py-2 sm:text-base"
            >
              <span className="hidden sm:inline">Subscribe for Updates</span>
              <span className="sm:hidden">Subscribe</span>
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                className={`relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 hover:border-gray-500 transition`}
                onClick={() => {
                  setOpen(!open);
                  setNewBadge(false);
                }}
              >
                {progress?.streak > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1 flex items-center transition ${
                      pulse ? "animate-ping-once" : ""
                    }`}
                  >
                    <Flame size={12} className="mr-0.5" /> {progress.streak}
                  </span>
                )}
                <User
                  size={18}
                  className={`${
                    newBadge
                      ? "text-yellow-400 animate-badge-glow"
                      : "text-gray-300"
                  }`}
                />
              </button>

              <div
                className={`absolute right-0 mt-2 w-64 sm:w-80 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-lg p-4 text-white backdrop-blur-md transform transition-all duration-200 origin-top-right
                  ${
                    open
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-0 pointer-events-none"
                  }`}
              >
                {progress && (
                  <>
                    <h3 className="text-lg font-semibold mb-3">
                      Your Progress
                    </h3>
                    <div className="flex justify-between mb-2">
                      <span>🔥 Current Streak</span>
                      <span className="font-bold">{progress.streak} days</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>📚 Total Questions</span>
                      <span className="font-bold">
                        {progress.totalQuestions}
                      </span>
                    </div>
                    <div>
                      <span>🏆 Badges</span>
                      {progress.badges.length === 0 ? (
                        <p className="text-gray-400 text-sm mt-1">
                          No badges yet
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {progress.badges.map((badge, idx) => (
                            <span
                              key={idx}
                              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-2 py-1 rounded-full font-medium shadow"
                            >
                              {badge.replace(/_/g, " ")}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
