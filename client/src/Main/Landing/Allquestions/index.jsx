import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/questions/all`);
        setQuestions(data.questions || []);
      } catch {
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading)
    return (
      <div className="max-w-4xl mx-auto py-20 text-center text-gray-400 text-xl">
        Loading all questions...
      </div>
    );

  if (!questions.length)
    return (
      <div className="max-w-4xl mx-auto py-20 text-center text-gray-400 text-xl">
        No questions found.
      </div>
    );

  return (
    <section className="py-20 px-4 min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Back button at top left */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg border border-gray-700 hover:bg-zinc-700 transition text-sm"
          >
            <svg
              className="w-4 h-4 cursor-pointer"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        </div>

        <div className="text-center mt-4 text-gray-400 text-2xl">
          Total Questions:{" "}
          <span className="font-bold text-purple-400">{questions.length}</span>
        </div>
        <h2 className="text-4xl font-bold mb-6 text-center">
          All Interview Questions
        </h2>

        <div className="grid gap-6">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="glass border border-gray-700 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4"
            >
              <div className="flex-1">
                <div className="text-sm text-gray-400 mb-1">{q.date}</div>
                <div className="font-semibold mb-2">{q.text}</div>
                <audio controls src={q.audioUrl} className="w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllQuestions;
