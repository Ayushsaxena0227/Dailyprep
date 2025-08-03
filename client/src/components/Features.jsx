import React from "react";

const Features = () => (
  <section className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Why Choose Daily Interview Prep?
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="glass border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 group">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-4">Audio Explanations</h3>
          <p className="text-gray-300">
            Clear explanations in Hinglish, perfect for developers who think in
            multiple languages
          </p>
        </div>
        {/* Feature 2 */}
        <div className="glass border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 group">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-4">Just 10 Minutes</h3>
          <p className="text-gray-300">
            Bite-sized daily content that fits into your busy schedule without
            overwhelming you
          </p>
        </div>
        {/* Feature 3 */}
        <div className="glass border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 group">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-4">No Barriers</h3>
          <p className="text-gray-300">
            No signup, no login, no hassle. Just open and start learning
            immediately
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Features;
