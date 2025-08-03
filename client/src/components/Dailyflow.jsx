import React from "react";

const DailyFlow = () => (
  <section className=" py-20 px-4 bg-gradient-to-r from-gray-900 via-purple-900/20 to-gray-900">
    <div className="max-w-4xl mx-auto text-center ">
      <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Your Daily Learning Flow
      </h2>
      <div className="space-y-8 cursor-pointer">
        <div className=" cursor-pointer flex items-center space-x-6 p-6 glass border border-gray-700 rounded-2xl">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center font-bold">
            1
          </div>
          <div className=" cursor-pointer text-left">
            <h3 className="font-semibold text-lg">Get Daily Questions</h3>
            <p className="text-gray-300">
              5-10 curated interview questions posted fresh every day
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-6 p-6 glass border border-gray-700 rounded-2xl">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold">
            2
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-lg">Listen & Learn</h3>
            <p className="text-gray-300 cursor-pointer">
              Audio explanations in Hinglish - clear, practical, and easy to
              understand
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-6 p-6 glass border border-gray-700 rounded-2xl">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold">
            3
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-lg">Share Feedback</h3>
            <p className="text-gray-300">
              Leave suggestions to help improve the content and topics
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DailyFlow;
