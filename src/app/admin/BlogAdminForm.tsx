"use client";

import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface BlogData {
  title: string;
  coverImageUrl: string;
  content: string;
  tags: string;
  youtube?: string;
  instagram?: string;
  linkedin?: string;
}

export default function BlogAdminForm({ onSuccess }: { onSuccess?: () => void }) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<BlogData>();
  const [error, setError] = useState('');

  const onSubmit = async (data: BlogData) => {
    setError('');
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          tags: data.tags.split(',').map(tag => tag.trim()),
          embeds: {
            youtube: data.youtube,
            instagram: data.instagram,
            linkedin: data.linkedin,
          },
        }),
      });
      if (!response.ok) throw new Error('Submission failed');
      reset();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title', { required: true })} placeholder="Blog Title" className="p-3 rounded-lg bg-white/20 text-[#232526] placeholder:text-[#232526]/60" />
      <input {...register('coverImageUrl', { required: true })} placeholder="Cover Image URL" className="p-3 rounded-lg bg-white/20 text-[#232526] placeholder:text-[#232526]/60" />
      <textarea {...register('content', { required: true })} placeholder="Blog Content (Markdown or Rich Text)" className="p-3 rounded-lg bg-white/20 text-[#232526] placeholder:text-[#232526]/60" rows={6} />
      <input {...register('tags', { required: true })} placeholder="Tags (comma separated)" className="p-3 rounded-lg bg-white/20 text-[#232526] placeholder:text-[#232526]/60" />
      <input {...register('youtube')} placeholder="YouTube Embed URL" className="p-3 rounded-lg bg-white/20 text-[#232526] placeholder:text-[#232526]/60" />
      <input {...register('instagram')} placeholder="Instagram Embed URL" className="p-3 rounded-lg bg-white/20 text-[#232526] placeholder:text-[#232526]/60" />
      <input {...register('linkedin')} placeholder="LinkedIn Embed URL" className="p-3 rounded-lg bg-white/20 text-[#232526] placeholder:text-[#232526]/60" />
      <button type="submit" disabled={isSubmitting} className="mt-4 px-6 py-3 rounded-full bg-[#ffd200] text-[#232526] font-bold text-lg shadow-lg hover:bg-[#f7971e] hover:text-white transition-all duration-300 border-2 border-white/20">
        {isSubmitting ? 'Saving...' : 'Save Blog 📝'}
      </button>
      {error && <div className="text-red-400 mt-2">{error}</div>}
    </form>
  );
}
