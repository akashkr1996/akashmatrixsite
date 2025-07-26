"use client";

import { useState } from 'react';
import { useAuth } from './AuthContext';

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestOtp = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message || 'OTP request failed');
      setOtpRequested(true);
    } catch (err: any) {
      setError(err.message || 'Failed to request OTP');
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin-login', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message || 'Invalid OTP');
      await login(email, otp); // Mark as authenticated
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-4 mb-8" onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Admin Email" className="p-3 rounded-lg bg-white/20 text-[#232526] placeholder:text-[#232526]/60" required />
      {!otpRequested && (
        <button type="button" onClick={handleRequestOtp} disabled={loading || !email} className="px-6 py-2 rounded-full bg-[#ffd200] text-[#232526] font-bold text-sm shadow hover:bg-[#f7971e] hover:text-white transition-all duration-300 border-2 border-white/20">
          {loading ? 'Requesting OTP...' : 'Request OTP'}
        </button>
      )}
      {otpRequested && (
        <input value={otp} onChange={e => setOtp(e.target.value)} type="text" placeholder="Enter OTP" className="p-3 rounded-lg bg-white/20 text-[#232526] placeholder:text-[#232526]/60" required />
      )}
      <button type="submit" disabled={loading || !otpRequested} className="mt-4 px-6 py-3 rounded-full bg-[#ffd200] text-[#232526] font-bold text-lg shadow-lg hover:bg-[#f7971e] hover:text-white transition-all duration-300 border-2 border-white/20">
        {loading ? 'Logging in...' : 'Login & Manage 🔐'}
      </button>
      {error && <div className="text-red-400 mt-2">{error}</div>}
    </form>
  );
}
