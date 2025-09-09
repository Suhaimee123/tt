import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Home() {
  const [time, setTime] = useState('');
  const [step, setStep] = useState<number | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('th-TH'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (step === null) return;
    if (step > 3) return;

    const timer = setTimeout(() => {
      if (step === 3) {
        setTimeout(() => {
          router.push('https://www.tiktok.com/@warungpos.app?_t=ZS-8zaX6XUYsEc&_r=1');
        }, 2000);
      } else {
        setStep((prev) => (prev ?? 0) + 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [step, router]);

  const handleStart = () => {
    setPopupVisible(true);
    setStep(1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[#087443] px-4 py-6 text-center">
      <div className="w-full max-w-md">
        <Image
          src="/logo.png"
          alt="WarungPOS Logo"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold mb-4">WarungPOS</h1>
        <p className="text-lg mb-6 leading-relaxed">
          โปรแกรมขายหน้าร้านที่ร้านอาหารไว้ใจ<br />
          ใช้ง่าย แยกจ่ายได้ ครัวก็จัดการสบาย
        </p>
        <div className="mb-2 text-sm text-gray-600">เวลาขณะนี้: {time}</div>
        <button
          onClick={handleStart}
          className="bg-[#087443] text-white px-6 py-3 rounded-full w-full text-lg hover:scale-105 transition"
        >
          เริ่มเลย
        </button>
      </div>

      {popupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-xs w-full animate-scale-in">
            <h2 className="text-xl font-semibold text-[#087443] mb-2">ทำ Content TikTok วันที่ 1</h2>
            <div className="text-3xl font-bold text-[#087443]">{step}</div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-scale-in {
          animation: scaleIn 0.3s ease;
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
