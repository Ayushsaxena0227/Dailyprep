import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const SuggestionBox = ({ date }) => {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!suggestion.trim()) {
      toast.error("Please enter your suggestion.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/suggestion`, {
        suggestion,
        date,
      });
      toast.success("Thanks for your suggestion!");
      setSuggestion("");
    } catch {
      toast.error("Failed to submit. Try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <textarea
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 resize-none"
        rows={3}
        placeholder="Have a suggestion or want a specific topic? Let us know!"
        value={suggestion}
        onChange={(e) => setSuggestion(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2 rounded-full font-semibold text-white transition-all duration-300"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Suggestion"}
      </button>
    </form>
  );
};

export default SuggestionBox;
