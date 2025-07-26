"use client";

import { useEffect, useState } from 'react';

interface Consultation {
  _id: string;
  name: string;
  phone: string;
  email: string;
  category: string;
  problem: string;
  upiScreenshotUrl: string;
  status: string;
  createdAt: string;
}

export default function ConsultationList() {
  const [consults, setConsults] = useState<Consultation[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/consults')
      .then(res => res.json())
      .then(data => {
        setConsults(data.consults || []);
        setLoading(false);
      });
  }, []);

  const filtered = consults.filter(c =>
    (!search || c.name.includes(search) || c.phone.includes(search)) &&
    (!filter || c.category === filter)
  );

  return (
    <div className="mt-8">
      <div className="flex gap-4 mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or phone" className="p-2 rounded bg-white/20 text-[#232526]" />
        <select value={filter} onChange={e => setFilter(e.target.value)} className="p-2 rounded bg-white/20 text-[#232526]">
          <option value="">All Categories</option>
          <option>PAN Help 🪪</option>
          <option>ITR Filing 📄</option>
          <option>Business Start 🏢</option>
          <option>Resume Help 📝</option>
          <option>QA Testing 🧪</option>
          <option>Insurance 📋</option>
        </select>
      </div>
      <button
        className="mb-4 px-4 py-2 rounded bg-[#ffd200] text-[#232526] font-bold text-sm shadow hover:bg-[#f7971e]"
        onClick={() => {
          const rows = [
            ['Name', 'Phone', 'Email', 'Category', 'Status', 'Date', 'Screenshot'],
            ...filtered.map(c => [c.name, c.phone, c.email, c.category, c.status, new Date(c.createdAt).toLocaleString(), c.upiScreenshotUrl])
          ];
          const csv = rows.map(r => r.map(x => `"${x}"`).join(',')).join('\n');
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'consultations.csv';
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        Export to CSV
      </button>
      {loading ? <div>Loading...</div> : (
        <table className="w-full text-sm bg-white/10 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#ffd200]/20">
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Screenshot</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c._id} className="border-b border-white/10">
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>{c.category}</td>
                <td>
                  {c.status}
                  <button
                    className={`ml-2 px-2 py-1 rounded ${c.status === 'done' ? 'bg-green-400' : 'bg-yellow-400'} text-xs`}
                    onClick={async () => {
                      const newStatus = c.status === 'pending' ? 'done' : 'pending';
                      await fetch('/api/consults/status', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: c._id, status: newStatus }),
                      });
                      window.location.reload();
                    }}
                  >
                    Mark {c.status === 'pending' ? 'Done' : 'Pending'}
                  </button>
                </td>
                <td>{new Date(c.createdAt).toLocaleString()}</td>
                <td><a href={c.upiScreenshotUrl} target="_blank" rel="noopener" className="underline">View</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
