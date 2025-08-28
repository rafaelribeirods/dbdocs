'use client';
import { useEffect, useState } from 'react';

export default function Loading() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    // <div className="flex justify-center items-center min-h-screen text-lg font-medium text-gray-700 dark:text-gray-200">
    <div className="fixed bottom-4 left-4 p-4 flex items-center">
      Loading{dots}
    </div>
  );
}