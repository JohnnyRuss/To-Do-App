import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import ThemeProvider from "./Theme/Theme";
import AppProvider from "./store/AppProvider";

createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </ThemeProvider>
);
