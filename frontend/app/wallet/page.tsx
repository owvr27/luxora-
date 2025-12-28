'use client';
import { useEffect, useState } from 'react';

export default function Wallet() {
  const [data, setData] = useState<{ balance: number; transactions: any[] } | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    const run = async () => {
      try {
        const token = localStorage.getItem('token') || '';
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wallet`, { headers: { Authorization: `Bearer ${token}` } });
        const d = await res.json();
        if (!res.ok) throw new Error(d.error || 'Error');
        setData(d);
      } catch (e: any) { setMsg(e.message); }
    };
    run();
  }, []);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Points Wallet</h1>
      {data ? (
        <>
          <p className="mb-2">Balance: {data.balance}</p>
          <ul className="space-y-2">
            {data.transactions.map((t) => (
              <li key={t.id} className="border p-2">
                <div>Type: {t.type}</div>
                <div>Points: {t.points}</div>
                <div>Date: {new Date(t.createdAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </>
      ) : <p>{msg || 'Loading...'}</p>}
    </div>
  );
}