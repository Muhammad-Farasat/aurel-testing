import "./styles/tokens.css";
import "./styles/base.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { DraftProvider } from "./booking/DraftContext";
import { router } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DraftProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </DraftProvider>
  </StrictMode>,
);
