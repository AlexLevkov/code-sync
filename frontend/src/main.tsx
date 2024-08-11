import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { store } from "./app/store/store";
import { ReactNotifications } from "react-notifications-component";
import { Provider } from "react-redux";
import "./styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ReactNotifications />
    <App />
  </Provider>
);
