"use client";

import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface FeedbackData {
  rating: number;
  comment: string;
}

export default function FeedbackForm() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FeedbackData>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: FeedbackData) => {
    setError('');
    setSuccess(false);
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Submission failed');
      setSuccess(true);
      reset();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <label className="text-white/80">Star Rating</label>
      <select {...register('rating', { required: true })} className="p-3 rounded-lg bg-white/20 text-white">
        <option value="">Select Rating</option>
        {[1,2,3,4,5].map(star => (
          <option key={star} value={star}>{'★'.repeat(star)}</option>
        ))}
      </select>
      <textarea {...register('comment', { required: true })} placeholder="Your feedback..." className="p-3 rounded-lg bg-white/20 text-white placeholder:text-white/60" rows={3} />
      <button type="submit" disabled={isSubmitting} className="mt-4 px-6 py-3 rounded-full bg-[#43cea2] text-[#171717] font-bold text-lg shadow-lg hover:bg-[#185a9d] hover:text-white transition-all duration-300 border-2 border-white/20">
        {isSubmitting ? 'Submitting...' : 'Submit Feedback ⭐'}
      </button>
      {success && <div className="text-green-400 mt-2">Thank you for your feedback!</div>}
      {error && <div className="text-red-400 mt-2">{error}</div>}
    </form>
  );
}
