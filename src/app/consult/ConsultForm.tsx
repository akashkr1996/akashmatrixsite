"use client";

import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  category: string;
  problem: string;
  upiScreenshot: FileList;
}

export default function ConsultForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: FormData) => {
    setError('');
    setSuccess(false);
    try {
      // Convert image to base64
      let upiScreenshotBase64 = '';
      if (data.upiScreenshot && data.upiScreenshot[0]) {
        const file = data.upiScreenshot[0];
        upiScreenshotBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }
      // Submit to backend
      const consultPayload = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        category: data.category,
        problem: data.problem,
        upiScreenshotBase64,
      };
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consultPayload),
      });
      if (!response.ok) throw new Error('Submission failed');
      const consultResult = await response.json();

      // Create Google Calendar event with Meet link
      const calendarRes = await fetch('/api/create-meet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          category: data.category,
          problem: data.problem,
        }),
      });
      if (!calendarRes.ok) throw new Error('Google Meet creation failed');
      const calendarResult = await calendarRes.json();

      // Backup to Google Sheets
      await fetch('/api/sheets-backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          category: data.category,
          problem: data.problem,
          upiScreenshotBase64,
          meetLink: calendarResult.meetLink,
        }),
      });

      setSuccess(true);
      reset();
      // Redirect to Thank You page with Meet link
      window.location.href = `/thank-you?meet=${encodeURIComponent(calendarResult.meetLink)}`;
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <form className="flex flex-col gap-3 sm:gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} placeholder="Name" className="p-2 sm:p-3 rounded-lg bg-white/20 text-white placeholder:text-white/60 text-sm sm:text-base" />
      <input {...register('phone', { required: true })} placeholder="Phone" className="p-2 sm:p-3 rounded-lg bg-white/20 text-white placeholder:text-white/60 text-sm sm:text-base" />
      <input {...register('email', { required: true })} placeholder="Email" className="p-2 sm:p-3 rounded-lg bg-white/20 text-white placeholder:text-white/60 text-sm sm:text-base" />
      <select {...register('category', { required: true })} className="p-2 sm:p-3 rounded-lg bg-white/20 text-white text-sm sm:text-base">
        <option value="">Select Category</option>
        <option>PAN Help 🪪</option>
        <option>ITR Filing 📄</option>
        <option>Business Start 🏢</option>
        <option>Resume Help 📝</option>
        <option>QA Testing 🧪</option>
        <option>Insurance 📋</option>
      </select>
      <textarea {...register('problem', { required: true })} placeholder="Your Concern" className="p-2 sm:p-3 rounded-lg bg-white/20 text-white placeholder:text-white/60 text-sm sm:text-base" rows={3} />
      <label className="text-white/80 text-xs sm:text-base">Upload UPI Screenshot <span className="text-lg sm:text-xl">📷</span></label>
      <input {...register('upiScreenshot', { required: true })} type="file" accept="image/*" className="p-1 sm:p-2 rounded-lg bg-white/20 text-white text-xs sm:text-base" />
      <button type="submit" disabled={isSubmitting} className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[#00eaff] text-[#171717] font-bold text-sm sm:text-lg shadow-lg hover:bg-[#232526] hover:text-white transition-all duration-300 border-2 border-white/20 w-full">
        {isSubmitting ? 'Submitting...' : 'Submit & Get WhatsApp Link 🔗'}
      </button>
      {success && <div className="text-green-400 mt-2 text-xs sm:text-base">Submitted! Redirecting...</div>}
      {error && <div className="text-red-400 mt-2 text-xs sm:text-base">{error}</div>}
    </form>
  );
}
