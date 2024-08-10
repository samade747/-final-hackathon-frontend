import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { SidebarProvider } from "./context/SidebarContext.jsx";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>

  <ThemeProvider>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </ThemeProvider>
  </Provider>
);
