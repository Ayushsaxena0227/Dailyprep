import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MessageSquare,
  FileAudio,
  Search as SearchIcon,
  Activity,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";
import { getUserId } from "../../../Utils/getUserId";

const SkeletonCard = React.memo(() => (
  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-5 border border-gray-700/50 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 bg-gray-700 rounded-xl" />
      <div className="w-8 h-8 bg-gray-700 rounded" />
    </div>
    <div className="w-3/4 h-5 bg-gray-700 rounded mb-3" />
    <div className="w-full h-12 bg-gray-700 rounded" />
  </div>
));

const StatCard = React.memo(
  ({ bgFrom, bgTo, icon, value, label, borderColor }) => (
    <div
      className={`bg-gradient-to-br ${bgFrom} ${bgTo} rounded-2xl p-5 border ${borderColor} backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="w-11 h-11 flex items-center justify-center bg-opacity-20 rounded-xl">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm">{label}</div>
    </div>
  )
);

const QuestionCard = React.memo(function QuestionCard({
  q,
  idx,
  currentIndex,
  formatDate,
  handleSelect,
}) {
  return (
    <div
      className={`bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-5 border transition-all duration-200 backdrop-blur-sm ${
        idx === currentIndex
          ? "border-purple-400/50"
          : "border-gray-700/50 hover:border-gray-600"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Calendar className="w-4 h-4 text-purple-300" />
          <span>{formatDate(q.date)}</span>
        </div>
        {idx === currentIndex && (
          <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
            Selected
          </span>
        )}
      </div>

      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
          <MessageSquare className="w-5 h-5 text-purple-300" />
        </div>
        <div className="text-white font-medium leading-relaxed">{q.text}</div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => handleSelect(idx)}
          className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm hover:bg-gray-700 transition cursor-pointer disabled:opacity-40"
          type="button"
          disabled={!q.audioUrl}
          title={q.audioUrl ? "Load in top player" : "No audio available"}
        >
          {q.audioUrl ? "Play in Player" : "No audio"}
        </button>
      </div>
    </div>
  );
});

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("all");
  const [sortDesc, setSortDesc] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/questions/all`)
      .then(({ data }) => {
        setQuestions(data.questions || []);
        setErr("");
      })
      .catch(() => {
        setErr("Failed to load questions.");
        setQuestions([]);
      })
      .finally(() => setLoading(false));
  }, [BASE_URL]);

  const uniqueDates = useMemo(
    () => Array.from(new Set(questions.map((q) => q.date))),
    [questions]
  );

  const displayed = useMemo(() => {
    let list = [...questions];
    if (selectedDate !== "all")
      list = list.filter((q) => q.date === selectedDate);
    if (search.trim())
      list = list.filter((q) =>
        q.text.toLowerCase().includes(search.toLowerCase())
      );
    list.sort((a, b) =>
      sortDesc
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
    return list;
  }, [questions, selectedDate, search, sortDesc]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    if (currentIndex >= displayed.length) setCurrentIndex(0);
  }, [displayed, currentIndex]);

  useEffect(() => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentIndex]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    const userId = getUserId();
    axios
      .post(`${BASE_URL}/progress/questionCompleted`, { email: userId })
      .then(() => toast.success("🎯 +1 Question Completed!"))
      .catch((err) => console.error("Failed to log question completion", err));
  };

  const handleNext = () => {
    if (currentIndex < displayed.length - 1) setCurrentIndex(currentIndex + 1);
  };
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  const handleSelect = (idx) => setCurrentIndex(idx);
  const handleBack = () => navigate(-1);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/70 border border-gray-700 hover:bg-gray-800 transition cursor-pointer"
            type="button"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="hidden md:flex items-center gap-3 text-sm text-gray-400">
            <Activity className="w-4 h-4 text-purple-400" />
            Updated UI
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            All Interview Questions
          </h1>
          <p className="text-gray-400 mt-2">
            Explore curated audio-first questions. Search, filter, and practice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            bgFrom="from-purple-600/20"
            bgTo="to-purple-800/20"
            borderColor="border-purple-500/20"
            icon={<MessageSquare className="w-5 h-5 text-purple-300" />}
            value={questions.length}
            label={<span className="text-purple-300">Total Questions</span>}
          />
          <StatCard
            bgFrom="from-cyan-600/20"
            bgTo="to-cyan-800/20"
            borderColor="border-cyan-500/20"
            icon={<Calendar className="w-5 h-5 text-cyan-300" />}
            value={uniqueDates.length}
            label={<span className="text-cyan-300">Days Covered</span>}
          />
          <StatCard
            bgFrom="from-emerald-600/20"
            bgTo="to-emerald-800/20"
            borderColor="border-emerald-500/20"
            icon={<FileAudio className="w-5 h-5 text-emerald-300" />}
            value={questions.filter((q) => q.audioUrl).length}
            label={<span className="text-emerald-300">With Audio</span>}
          />
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-4 md:p-5 border border-gray-700/50 backdrop-blur-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-1">
              <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions..."
                className="w-full bg-gray-800/70 border border-gray-700 rounded-xl pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-gray-800/70 border border-gray-700 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            >
              <option value="all">All dates</option>
              {uniqueDates
                .slice()
                .sort((a, b) => new Date(b) - new Date(a))
                .map((d) => (
                  <option key={d} value={d}>
                    {formatDate(d)}
                  </option>
                ))}
            </select>

            <button
              onClick={() => setSortDesc((s) => !s)}
              className="inline-flex items-center gap-2 bg-gray-800/70 border border-gray-700 rounded-xl px-3 py-2.5 hover:bg-gray-800 transition cursor-pointer"
              title="Toggle sort order"
              type="button"
            >
              <ArrowUpDown className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-300">
                {sortDesc ? "Newest first" : "Oldest first"}
              </span>
            </button>

            {(search || selectedDate !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedDate("all");
                }}
                className="inline-flex items-center gap-2 bg-gray-700/70 border border-gray-700 rounded-xl px-3 py-2.5 hover:bg-gray-700 transition cursor-pointer"
                type="button"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {err && (
          <div className="bg-yellow-500/20 text-yellow-200 border border-yellow-500/30 rounded-xl p-4 mb-6">
            {err}
          </div>
        )}

        {!loading && displayed.length > 0 && (
          <div className="max-w-2xl mx-auto mb-10">
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">
                  Question {currentIndex + 1} of {displayed.length}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(displayed[currentIndex].date)}</span>
                </div>
              </div>

              <p className="text-gray-300 mb-4 text-sm">
                {displayed[currentIndex].text}
              </p>

              <div className="flex items-center space-x-4 mb-4">
                <button
                  className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer disabled:opacity-40"
                  onClick={handlePlayPause}
                  disabled={!displayed[currentIndex].audioUrl}
                  type="button"
                >
                  {isPlaying ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <rect x="4" y="4" width="4" height="12" rx="1" />
                      <rect x="12" y="4" width="4" height="12" rx="1" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8 5v10l7-5z" />
                    </svg>
                  )}
                </button>
              </div>

              <audio
                ref={audioRef}
                src={displayed[currentIndex].audioUrl || ""}
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
                  disabled={currentIndex === displayed.length - 1}
                  className={`px-4 py-2 rounded-xl bg-zinc-800 border border-gray-700 text-sm cursor-pointer ${
                    currentIndex === displayed.length - 1
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-zinc-700"
                  }`}
                  type="button"
                >
                  Next ▶
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl border border-gray-700/50">
            <FileAudio className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <div className="text-xl text-gray-300 mb-1">No questions found</div>
            <div className="text-gray-500">
              Try clearing filters or searching with different keywords.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayed.map((q, idx) => (
              <QuestionCard
                key={`${q.date}-${idx}`}
                q={q}
                idx={idx}
                currentIndex={currentIndex}
                formatDate={formatDate}
                handleSelect={handleSelect}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllQuestions;
