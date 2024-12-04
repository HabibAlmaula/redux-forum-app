import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import ForumApp from "./ForumApp";
import { Provider } from "react-redux";
import { store } from "./states";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ForumApp />
    </Provider>
  </StrictMode>
);
