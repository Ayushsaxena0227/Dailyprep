import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import SuggestionBox from "../components/SuggestionBox";
const AudioPreview = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/questions/today`);
        setQuestions(data.questions || []);
      } catch (err) {
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading)
    return (
      <div className="max-w-md mx-auto mb-12">
        <div className="glass border border-gray-700 rounded-2xl p-6 flex flex-col items-center">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M8 5v10l7-5z"
                />
              </svg>
            </div>
            <div className="flex-1 flex items-center space-x-1">
              <div className="w-1 h-6 bg-purple-500 audio-wave animate-pulse"></div>
              <div
                className="w-1 h-4 bg-blue-500 audio-wave animate-pulse"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-1 h-8 bg-purple-500 audio-wave animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-1 h-5 bg-blue-500 audio-wave animate-pulse"
                style={{ animationDelay: "0.3s" }}
              ></div>
              <div
                className="w-1 h-7 bg-purple-500 audio-wave animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
              <div
                className="w-1 h-3 bg-blue-500 audio-wave animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
          </div>
          <p className="text-gray-400 text-center text-sm mt-2">Loading...</p>
        </div>
      </div>
    );
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!questions.length)
    return <p className="text-center mt-10">No questions for today.</p>;

  const current = questions[currentIndex];

  return (
    <div className="max-w-md mx-auto mb-12">
      <div className="glass border border-gray-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">
            Today's Question #{currentIndex + 1}
          </h3>
          {/* Optionally, you can show audio duration here if you want */}
        </div>
        <p className="text-gray-300 mb-4 text-sm">{current.text}</p>
        <div className="flex items-center space-x-4 mb-4">
          <button
            className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
            onClick={handlePlayPause}
            type="button"
          >
            {isPlaying ? (
              // Pause icon
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <rect x="4" y="4" width="4" height="12" rx="1" />
                <rect x="12" y="4" width="4" height="12" rx="1" />
              </svg>
            ) : (
              // Play icon
              <svg
                className="w-5 h-5 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 5v10l7-5z" />
              </svg>
            )}
          </button>
          <div className="flex-1 flex items-center space-x-1">
            {/* Fake animated audio wave */}
            <div className="w-1 h-6 bg-purple-500 audio-wave animate-pulse"></div>
            <div
              className="w-1 h-4 bg-blue-500 audio-wave animate-pulse"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-1 h-8 bg-purple-500 audio-wave animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-1 h-5 bg-blue-500 audio-wave animate-pulse"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="w-1 h-7 bg-purple-500 audio-wave animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
            <div
              className="w-1 h-3 bg-blue-500 audio-wave animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>
        </div>
        <audio
          ref={audioRef}
          src={current.audioUrl}
          onEnded={handleAudioEnded}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          className="hidden"
        />
        <div className="flex justify-between mt-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded-xl bg-zinc-800 border border-gray-700 text-sm cursor-pointer ${
              currentIndex === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-zinc-700"
            }`}
            type="button"
          >
            ◀ Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className={`px-4 py-2 rounded-xl bg-zinc-800 border border-gray-700 text-sm cursor-pointer ${
              currentIndex === questions.length - 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-zinc-700"
            }`}
            type="button"
          >
            Next ▶
          </button>
        </div>
        <SuggestionBox date={new Date().toISOString().split("T")[0]} />
      </div>
    </div>
  );
};

export default AudioPreview;
