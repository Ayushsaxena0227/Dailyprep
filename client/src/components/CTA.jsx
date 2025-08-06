import React from "react";
import { Link } from "react-router-dom";
const CTA = ({ showModal }) => (
  <section className="py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6">
        Ready to Ace Your Next Interview?
      </h2>
      <p className="text-xl text-gray-300 mb-8">
        Join thousands of developers who are already preparing smarter, not
        harder
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 cursor-pointer">
          Start Your Journey
        </button>
        <button
          onClick={showModal}
          className=" cursor-pointer border border-gray-600 hover:border-gray-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-800"
        >
          Get Notified of New Questions
        </button>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
        <div className="text-center">
          <Link
            to="/all-questions"
            className="text-center cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
            <div className="text-gray-300">Questions Covered</div>
          </Link>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">10min</div>
          <div className="text-gray-300">Daily Commitment</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">0₹</div>
          <div className="text-gray-300">Completely Free</div>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
