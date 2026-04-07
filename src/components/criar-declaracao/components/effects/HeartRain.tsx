import { useEffect, useState } from "react";

export default function HeartRain() {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 20 + 10
      };

      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.slice(1));
      }, 5000);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute animate-fall"
          style={{
            left: `${heart.left}%`,
            fontSize: heart.size
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}