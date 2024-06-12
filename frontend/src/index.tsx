import ReactDOM from "react-dom/client";
import App from "./App";
// css
import "./styles/index.scss";
// state
import { ReactNotifications } from "react-notifications-component";
import { Provider } from "react-redux";
import { store } from "./app/store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ReactNotifications />
    <App />
  </Provider>
);
