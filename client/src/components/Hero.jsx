import React from "react";
import AudioPreview from "./AudioPreview";
import { Link } from "react-router-dom";

const Hero = ({ showModal }) => (
  <section className="pt-24 pb-12 px-4">
    <div className="max-w-7xl mx-auto text-center">
      <div className="floating mb-8">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 rounded-full px-4 py-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm">
            10 minutes daily • Interview ready in weeks
          </span>
        </div>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
        Master Full stack Interviews
        <br />
        in <span className="text-yellow-400">10 Minutes</span> Daily
      </h1>
      <p className="text-4xl md:text-2xl sm:text-xs mb-12 max-w-3xl mx-auto leading-relaxed space-y-3">
        <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold">
          Short on time? Cramming prep into your busy day?
        </span>
        <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold">
          Tired of endless Googling for good interview questions?
        </span>
        <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold">
          Get 5–10 expert‑curated questions daily — each with engaging audio
          explanations in Hinglish.
        </span>
        <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold">
          Practice anywhere, anytime. No signup. Just pure learning.
        </span>
      </p>
      <AudioPreview />
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link to="/all-questions">
          <button className="border cursor-pointer border-gray-600 hover:border-gray-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-800">
            View Sample Questions
          </button>
        </Link>
      </div>
    </div>
  </section>
);

export default Hero;
