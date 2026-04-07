import { useEffect, useState } from "react";

export default function EmojiRain({ emojis }: { emojis: string[] }) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const emoji = {
        id: Math.random(),
        left: Math.random() * 100,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      };

      setItems((prev) => [...prev, emoji]);

      setTimeout(() => {
        setItems((prev) => prev.slice(1));
      }, 5000);
    }, 500);

    return () => clearInterval(interval);
  }, [emojis]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {items.map((item) => (
        <span
          key={item.id}
          className="absolute animate-fall text-xl"
          style={{ left: `${item.left}%` }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}