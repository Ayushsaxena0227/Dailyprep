import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  Upload,
  Plus,
  Trash2,
  Calendar,
  MessageSquare,
  Users,
  Lightbulb,
  TrendingUp,
  Activity,
  FileAudio,
  Clock,
  Eye,
  Hand,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ModernAdminDashboard = () => {
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [questions, setQuestions] = useState([
    { text: "", audioFile: null, audioUrl: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const [suggestionsLoading, setSuggestionsLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [stats, setStats] = useState({});
  const BASE_URL = import.meta.env.VITE_API_URL;
  const adminSecret = localStorage.getItem("adminSecret");

  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/admin/stats`, {
          headers: { "x-admin-secret": adminSecret },
        });
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setStats({});
      } finally {
        setStatsLoading(false);
      }
    };

    const fetchSuggestions = async () => {
      setSuggestionsLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/suggestion/all`, {
          headers: { "x-admin-secret": adminSecret },
        });
        setSuggestions(data.suggestions || []);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        setSuggestions([]);
      } finally {
        setSuggestionsLoading(false);
      }
    };

    fetchStats();
    fetchSuggestions();
  }, [BASE_URL, adminSecret]);

  const generateChartData = () => {
    const last7Days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const dayName = date.toLocaleDateString("en", { weekday: "short" });

      const suggestionsCount = suggestions.filter(
        (s) => s.createdAt && s.createdAt.startsWith(dateStr)
      ).length;

      last7Days.push({
        name: dayName,
        suggestions: suggestionsCount,
        date: dateStr,
      });
    }

    return last7Days;
  };

  const SkeletonCard = () => (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700/50 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-xl"></div>
        <div className="w-6 h-6 bg-gray-700 rounded"></div>
      </div>
      <div className="w-16 h-8 bg-gray-700 rounded mb-2"></div>
      <div className="w-24 h-4 bg-gray-700 rounded"></div>
    </div>
  );

  const SuggestionSkeleton = () => (
    <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-xl p-4 border border-gray-700/30 animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="w-20 h-4 bg-gray-600 rounded"></div>
        <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
      </div>
      <div className="space-y-2 mb-3">
        <div className="w-full h-4 bg-gray-600 rounded"></div>
        <div className="w-3/4 h-4 bg-gray-600 rounded"></div>
      </div>
      <div className="w-32 h-3 bg-gray-600 rounded"></div>
    </div>
  );

  const handleTextChange = (idx, value) => {
    const updated = [...questions];
    updated[idx].text = value;
    setQuestions(updated);
  };

  const handleAudioChange = async (idx, file) => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("audio", file);
    try {
      const { data } = await axios.post(`${BASE_URL}/upload/audio`, formData, {
        headers: { "x-admin-secret": adminSecret },
      });
      const updated = [...questions];
      updated[idx].audioFile = file;
      updated[idx].audioUrl = data.url;
      toast.success("Audio uploaded successfully");
      setQuestions(updated);
    } catch (err) {
      toast.error("Audio upload failed");
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = () =>
    setQuestions([...questions, { text: "", audioFile: null, audioUrl: "" }]);

  const removeQuestion = (idx) =>
    setQuestions(questions.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (questions.some((q) => !q.text || !q.audioUrl)) {
      toast.error("Please fill all questions and upload audio");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}/questions/add`,
        {
          date,
          questions: questions.map((q) => ({
            text: q.text,
            audioUrl: q.audioUrl,
          })),
        },
        {
          headers: { "x-admin-secret": adminSecret },
        }
      );
      toast.success("Questions uploaded successfully!");
      setQuestions([{ text: "", audioFile: null, audioUrl: "" }]);
      setMsg("");
    } catch (err) {
      toast.error("Failed to upload questions.");
      setMsg("Failed to upload questions.");
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  const chartData = generateChartData();
  const Handlelogout = () => {
    localStorage.removeItem("adminSecret");
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <button onClick={Handlelogout} className="cursor-pointer">
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-2xl p-6 border border-purple-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-purple-400" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stats.totalQuestions ?? "--"}
                </div>
                <div className="text-purple-300 text-sm">Total Questions</div>
              </div>

              <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 rounded-2xl p-6 border border-cyan-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-cyan-400" />
                  </div>
                  <Activity className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stats.totalSubscribers ?? "--"}
                </div>
                <div className="text-cyan-300 text-sm">Subscribers</div>
              </div>

              <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 rounded-2xl p-6 border border-emerald-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-emerald-400" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stats.totalSuggestions ?? suggestions.length}
                </div>
                <div className="text-emerald-300 text-sm">Suggestions</div>
              </div>
            </>
          )}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
              <Activity className="w-5 h-5 mr-2 text-purple-400" />
              Weekly Suggestions Activity
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="suggestionGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="suggestions"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#suggestionGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm mb-8">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
            <Upload className="w-6 h-6 mr-2 text-purple-400" />
            Upload Questions
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-300 font-medium">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {questions.map((q, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-gray-700/30 to-gray-600/20 p-6 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <label className="text-lg font-medium text-white flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-purple-400" />
                    Question {idx + 1}
                  </label>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(idx)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  value={q.text}
                  onChange={(e) => handleTextChange(idx, e.target.value)}
                  placeholder="Enter your question here..."
                  className="bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 w-full mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />

                <div className="mb-4">
                  <label className="block mb-2 text-gray-300 text-sm font-medium">
                    <FileAudio className="w-4 h-4 inline mr-2" />
                    Audio File
                  </label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleAudioChange(idx, e.target.files[0])}
                    className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30 transition-colors cursor-pointer"
                  />
                </div>

                {q.audioUrl && (
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <audio controls src={q.audioUrl} className="w-full" />
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={addQuestion}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Question
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 px-8 py-3 rounded-xl text-white font-medium transition-all duration-200 flex items-center"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Submit All
                  </>
                )}
              </button>
            </div>

            {msg && (
              <div
                className={`mt-4 p-4 rounded-lg ${
                  msg.includes("success") || msg.includes("successfully")
                    ? "bg-green-500/20 text-green-300"
                    : "bg-yellow-500/20 text-yellow-300"
                }`}
              >
                {msg}
              </div>
            )}
          </form>
        </div>

        {/* Suggestions Section */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
            <Lightbulb className="w-6 h-6 mr-2 text-emerald-400" />
            User Suggestions
            <span className="ml-auto text-sm bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full">
              {suggestions.length} total
            </span>
          </h2>

          {suggestionsLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <SuggestionSkeleton key={i} />
              ))}
            </div>
          ) : suggestions.length === 0 ? (
            <div className="text-center py-12">
              <Lightbulb className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <div className="text-xl text-gray-400 mb-2">
                No suggestions yet
              </div>
              <div className="text-gray-500">
                User suggestions will appear here when submitted
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
              {suggestions.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-xl p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-200 hover:transform hover:scale-[1.02]"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center text-sm text-emerald-400 font-medium">
                      <Calendar className="w-4 h-4 mr-1" />
                      {s.date}
                    </div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  </div>
                  <div className="text-white mb-3 leading-relaxed">
                    {s.suggestion}
                  </div>
                  {s.createdAt && (
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(s.createdAt).toLocaleString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6b7280;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default ModernAdminDashboard;
