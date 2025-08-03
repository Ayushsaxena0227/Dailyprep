import React, { useEffect, useState } from "react";
import axios from "axios";

const AudioPreview = () => {
  const [questions, setQuestions] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5003/questions/today"
        );
        setQuestions(data.questions);
        setAudioUrl(data.audioUrl);
      } catch (err) {
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-md mx-auto my-12">
      <div className="glass border border-gray-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">
            Today's Question #{currentIndex + 1}
          </h3>
        </div>
        <p className="text-gray-300 mb-4 text-sm">{questions[currentIndex]}</p>
        <audio controls className="w-full mb-4">
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded-xl bg-zinc-800 border border-gray-700 text-sm ${
              currentIndex === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-zinc-700"
            }`}
          >
            ◀ Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className={`px-4 py-2 rounded-xl bg-zinc-800 border border-gray-700 text-sm ${
              currentIndex === questions.length - 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-zinc-700"
            }`}
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPreview;
