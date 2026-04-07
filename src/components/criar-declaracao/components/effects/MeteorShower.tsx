import { useEffect, useState } from "react";

export default function MeteorShower() {
  const [meteors, setMeteors] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const meteor = {
        id: Math.random(),
        top: Math.random() * 50,
        left: Math.random() * 100
      };

      setMeteors((prev) => [...prev, meteor]);

      setTimeout(() => {
        setMeteors((prev) => prev.slice(1));
      }, 3000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor"
          style={{
            top: `${meteor.top}%`,
            left: `${meteor.left}%`
          }}
        />
      ))}
    </div>
  );
}