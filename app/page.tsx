"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import Antigravity from "@/components/Antigravity";
import { main } from "framer-motion/client";
export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number }[]>([]);

  // Set your start date here! year, month (0-indexed), day
  const START_DATE = new Date(2024, 6, 23); // Jan 1, 2024

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - START_DATE.getTime();

      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ years, months, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const spawnHearts = () => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setHearts((prev) => [...prev, ...newHearts]);

    // Cleanup old hearts
    setTimeout(() => {
      setHearts((prev) => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 4000);
  };

  return (
    <main className="relative min-h-screen bg-red-100 w-full overflow-hidden">
      <div className="fixed inset-0">
        <Antigravity
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color={'#FF9FFC'}
          autoAnimate={true}
          particleVariance={1}
        />
      </div>
      <nav className="relative z-10 min-h-screen flex flex-col items-center justify-center overflow-hidden font-kanit pointer-events-none">
        {/* Background Floating Hearts */}
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute bottom-0 text-pink-500 animate-float pointer-events-none"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              fontSize: `${Math.random() * 20 + 20}px`,
            }}
          >
            <Heart fill="currentColor" />
          </div>
        ))}
        <div className="z-10 bg-white/30 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-white/50 text-center max-w-2xl w-full mx-4 transform transition-all hover:scale-[1.02] pointer-events-auto">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Heart className="w-20 h-20 text-red-500 animate-pulse" fill="currentColor" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl">
                Love
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-pink-700 mb-2 drop-shadow-sm">
            รักแฟนที่สุดในโลก
          </h1>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
            <TimeBox value={timeLeft.years} label="ปี" />
            <TimeBox value={timeLeft.months} label="เดือน" />
            <TimeBox value={timeLeft.days} label="วัน" />
            <TimeBox value={timeLeft.hours} label="ชั่วโมง" />
            <TimeBox value={timeLeft.minutes} label="นาที" />
            <TimeBox value={timeLeft.seconds} label="วินาที" />
          </div>

          <button
            onClick={spawnHearts}
            className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all active:scale-95"
          >
            <span className="flex items-center gap-2">
              บอกรัก 🤟 <Heart className="w-5 h-5 group-hover:scale-125 transition-transform" />
            </span>
            <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        <style jsx global>{`
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
          }
          .animate-float {
            animation: float 4s linear forwards;
          }
        `}</style>
      </nav>
    </main>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white/40 p-3 rounded-xl backdrop-blur-sm border border-white/20">
      <div className="text-2xl md:text-3xl font-bold text-pink-600">{value}</div>
      <div className="text-xs md:text-sm text-pink-800 font-medium">{label}</div>
    </div>
  );
}
