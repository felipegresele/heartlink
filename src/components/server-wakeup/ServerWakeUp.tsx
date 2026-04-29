import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";

interface ServerWakeUpContextType {
  isWakingUp: boolean;
}

const ServerWakeUpContext = createContext<ServerWakeUpContextType>({
  isWakingUp: false,
});

export function useServerWakeUp() {
  return useContext(ServerWakeUpContext);
}

const BACKEND_URL = "https://lovepage-backend.onrender.com";
const SLOW_REQUEST_THRESHOLD_MS = 2000;

export function ServerWakeUpProvider({ children }: { children: ReactNode }) {
  const [isWakingUp, setIsWakingUp] = useState(false);
  const pendingCount = useRef(0);
  const originalFetch = useRef<typeof fetch | null>(null);

  const incrementPending = useCallback(() => {
    pendingCount.current += 1;
  }, []);

  const decrementPending = useCallback(() => {
    pendingCount.current = Math.max(0, pendingCount.current - 1);
    if (pendingCount.current === 0) {
      setIsWakingUp(false);
    }
  }, []);

  useEffect(() => {
    originalFetch.current = window.fetch.bind(window);

    window.fetch = async function interceptedFetch(
      input: RequestInfo | URL,
      init?: RequestInit
    ): Promise<Response> {
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
          ? input.href
          : (input as Request).url;

      const isBackendRequest = url.startsWith(BACKEND_URL);

      if (!isBackendRequest) {
        return originalFetch.current!(input, init);
      }

      incrementPending();

      const timer = setTimeout(() => {
        if (pendingCount.current > 0) {
          setIsWakingUp(true);
        }
      }, SLOW_REQUEST_THRESHOLD_MS);

      try {
        const response = await originalFetch.current!(input, init);
        return response;
      } finally {
        clearTimeout(timer);
        decrementPending();
      }
    };

    return () => {
      if (originalFetch.current) {
        window.fetch = originalFetch.current;
      }
    };
  }, [incrementPending, decrementPending]);

  return (
    <ServerWakeUpContext.Provider value={{ isWakingUp }}>
      {children}
      {isWakingUp && <ServerWakeUpModal />}
    </ServerWakeUpContext.Provider>
  );
}

function ServerWakeUpModal() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "fadeIn 0.3s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>

      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "24px",
          padding: "40px 48px",
          maxWidth: "360px",
          width: "90%",
          textAlign: "center",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow decorativo */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "120px",
            height: "120px",
            background: "radial-gradient(circle, rgba(244,114,182,0.3) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        {/* Ícone com animação */}
        <div style={{ position: "relative", display: "inline-block", marginBottom: "24px" }}>
          {/* Anel pulsante */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px solid rgba(244,114,182,0.6)",
              animation: "pulse-ring 1.5s ease-out infinite",
            }}
          />
          {/* Spinner */}
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              border: "3px solid rgba(255,255,255,0.1)",
              borderTop: "3px solid #f472b6",
              animation: "spin 1s linear infinite",
              position: "relative",
            }}
          />
          {/* Ícone de coração no centro */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
            }}
          >
            🤍
          </div>
        </div>

        {/* Título */}
        <h2
          style={{
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "8px",
            letterSpacing: "-0.3px",
          }}
        >
          Conectando ao servidor
        </h2>

        {/* Subtítulo */}
        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: "13px",
            lineHeight: "1.6",
            marginBottom: "24px",
          }}
        >
          O servidor estava em modo de espera.
        </p>

        {/* Dots animados */}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#f472b6",
                animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Hint */}
        <p
          style={{
            marginTop: "20px",
            color: "rgba(255,255,255,0.3)",
            fontSize: "11px",
          }}
        >
          Aguarde alguns instantes
        </p>
      </div>
    </div>
  );
}