import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner"; // <-- use sonner's toast

const Admin = () => {
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [questions, setQuestions] = useState([
    { text: "", audioFile: null, audioUrl: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const BASE_URL = import.meta.env.VITE_API_URL;

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
      const { data } = await axios.post(`${BASE_URL}/upload/audio`, formData);
      const updated = [...questions];
      updated[idx].audioFile = file;
      updated[idx].audioUrl = data.url;
      toast.success("Audio uploaded successfully");
      setQuestions(updated);
    } catch (err) {
      toast.error("Audio upload failed");
      alert("Audio upload failed");
    }
    setLoading(false);
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
      await axios.post(`${BASE_URL}/questions/add`, {
        date,
        questions: questions.map((q) => ({
          text: q.text,
          audioUrl: q.audioUrl,
        })),
      });
      toast.success("Questions uploaded successfully!");
      setQuestions([{ text: "", audioFile: null, audioUrl: "" }]);
    } catch (err) {
      toast.error("Failed to upload questions.");
      setMsg("Failed to upload questions.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel: Upload Questions</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        <div>
          <label className="block mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded px-4 py-2 w-full"
          />
        </div>
        {questions.map((q, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded mb-4">
            <label className="block mb-2">Question {idx + 1}</label>
            <input
              type="text"
              value={q.text}
              onChange={(e) => handleTextChange(idx, e.target.value)}
              placeholder="Enter question"
              className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full mb-2"
            />
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => handleAudioChange(idx, e.target.files[0])}
              className="mb-2 cursor-pointer"
            />
            {q.audioUrl && (
              <audio controls src={q.audioUrl} className="w-full mb-2" />
            )}
            {questions.length > 1 && (
              <button
                type="button"
                onClick={() => removeQuestion(idx)}
                className="text-red-400 hover:underline text-sm cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          className=" cursor-pointer bg-blue-600 px-4 py-2 rounded text-white mr-4"
        >
          + Add Question
        </button>
        <button
          type="submit"
          className="bg-green-600 px-6 py-2 rounded text-white"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit All"}
        </button>
        {msg && <div className="mt-4 text-yellow-400">{msg}</div>}
      </form>
    </div>
  );
};

export default Admin;
