import React, { useRef } from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Features from "../../components/Features";
import DailyFlow from "../../components/Dailyflow";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";
import NotificationModal from "../../components/NotificationModal";
import GlassStyles from "../../components/GlassStyles";

const Landing = () => {
  const modalRef = useRef();

  const showModal = () => {
    modalRef.current.classList.remove("hidden");
    modalRef.current.classList.add("flex");
  };
  const hideModal = () => {
    modalRef.current.classList.add("hidden");
    modalRef.current.classList.remove("flex");
  };
  const handleSubscribe = () => {
    const email = modalRef.current.querySelector('input[type="email"]').value;
    if (email) {
      alert("Thanks for subscribing! You'll get notified when we launch.");
      hideModal();
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-lexend">
      <Header showModal={showModal} />
      <Hero showModal={showModal} />
      <Features />
      <DailyFlow />
      <CTA showModal={showModal} />
      <Footer />
      <NotificationModal
        modalRef={modalRef}
        hideModal={hideModal}
        handleSubscribe={handleSubscribe}
      />
      <GlassStyles />
    </div>
  );
};

export default Landing;
