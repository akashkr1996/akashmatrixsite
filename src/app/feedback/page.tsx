"use client";

import { motion } from "framer-motion";
import FeedbackForm from "./FeedbackForm";

export default function FeedbackPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#43cea2] via-[#185a9d] to-[#ff6e7f] p-8">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="glassmorphism p-8 rounded-2xl shadow-2xl backdrop-blur-lg max-w-lg w-full"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4 flex items-center justify-center gap-2">
          Share Your Feedback <span className="animate-bounce">⭐</span>
        </h1>
        <p className="text-white/80 text-center mb-6">
          Your feedback helps us improve and serve you better!
        </p>
        <FeedbackForm />
      </motion.div>
    </div>
  );
}
