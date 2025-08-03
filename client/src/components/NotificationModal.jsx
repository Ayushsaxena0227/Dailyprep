import React from "react";

const NotificationModal = ({ modalRef, hideModal, handleSubscribe }) => (
  <div
    ref={modalRef}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm hidden items-center justify-center z-50"
    onClick={(e) => {
      if (e.target === modalRef.current) hideModal();
    }}
  >
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md mx-4">
      <h3 className="text-2xl font-bold mb-4 text-center">
        Get Daily Notifications
      </h3>
      <p className="text-gray-300 mb-6 text-center">
        Never miss your daily interview prep! We'll notify you when new
        questions are posted.
      </p>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
        />
        <div className="flex gap-3">
          <button
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-3 rounded-lg font-semibold transition-all"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
          <button
            className="flex-1 border border-gray-600 hover:border-gray-500 py-3 rounded-lg font-semibold transition-all"
            onClick={hideModal}
          >
            Later
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default NotificationModal;
