'use client';
import { useEffect, useState } from 'react';

export default function Rewards() {
  const [rewards, setRewards] = useState<any[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rewards`);
        const d = await res.json();
        if (!res.ok) throw new Error(d.error || 'Error');
        setRewards(d);
      } catch (e: any) { setMsg(e.message); }
    };
    run();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Rewards</h1>
      {msg && <p>{msg}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rewards.map((r) => (
          <li key={r.id} className="border p-3">
            <div className="font-semibold">{r.title}</div>
            <div>Points required: {r.pointsRequired}</div>
            <div>Availability: {r.availability}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}