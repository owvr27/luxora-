'use client';
import { useEffect, useState } from 'react';

type Bin = { binId: string; lat: number; lng: number; status: string; capacityUsed: number; acceptsRecycling: boolean };

export default function Bins() {
  const [bins, setBins] = useState<Bin[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bins`);
        const d = await res.json();
        if (!res.ok) throw new Error(d.error || 'Error');
        setBins(d);
      } catch (e: any) { setMsg(e.message); }
    };
    run();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">حاويات Luxora Environmental</h1>
      {msg && <p>{msg}</p>}
      <ul className="space-y-2">
        {bins.map((b) => (
          <li key={b.binId} className="border p-2">
            <div>Bin: {b.binId}</div>
            <div>Location: {b.lat.toFixed(5)}, {b.lng.toFixed(5)}</div>
            <div>Status: {b.status}</div>
            <div>Capacity used: {b.capacityUsed} kg</div>
            <div>Accepts recycling: {b.acceptsRecycling ? 'Yes' : 'No'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}