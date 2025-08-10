import React, { useRef, useEffect, useState } from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Features from "../../components/Features";
import DailyFlow from "../../components/Dailyflow";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";
import NotificationModal from "../../components/NotificationModal";
import GlassStyles from "../../components/GlassStyles";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [questions, setQuestions] = useState([]);
  const modalRef = useRef();
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await axios.post(`${BASE_URL}/visit`);
      } catch (err) {
        console.error("Failed to log visit:", err);
      }
    };
    trackVisit();
  }, [BASE_URL]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/questions/all`
        );
        setQuestions(data.questions || []);
      } catch {
        setQuestions([]);
      }
    };
    fetchQuestions();
  }, []);

  const showModal = () => {
    modalRef.current.classList.remove("hidden");
    modalRef.current.classList.add("flex");
  };
  const hideModal = () => {
    modalRef.current.classList.add("hidden");
    modalRef.current.classList.remove("flex");
  };

  const handleSubscribe = async () => {
    const email = modalRef.current.querySelector('input[type="email"]').value;
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/subscribe`, { email });
      toast.success(
        "Thanks for subscribing! You'll get notified when I will post questions."
      );
      hideModal();
    } catch (err) {
      toast.error("Subscription failed. Try again.");
    }
  };

  React.useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        navigate("/admin");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  return (
    <div className="bg-gray-900 text-white min-h-screen font-lexend">
      <Header showModal={showModal} />
      <Hero showModal={showModal} />
      <Features />
      <DailyFlow />
      <CTA showModal={showModal} questions={questions} />
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
