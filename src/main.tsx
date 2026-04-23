import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { ServerWakeUpProvider } from "./components/server-wakeup/ServerWakeUp.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <ServerWakeUpProvider>
        <App />
      </ServerWakeUpProvider>
    </MantineProvider>
  </React.StrictMode>,
);
