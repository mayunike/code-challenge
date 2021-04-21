import "./index.css";

import { QueryClient, QueryClientProvider } from "react-query";

import React from "react";
import ReactDOM from "react-dom";
import Students from "./Containers/Students";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import axios from "axios";
import { createMuiTheme } from "@material-ui/core/styles";
import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient();

axios.defaults.baseURL = "https://api.hatchways.io";
axios.defaults.headers.post["Content-Type"] = "application/json";

const theme = createMuiTheme({
  overrides: {
    MuiAvatar: {
      root: {
        border: "1px solid rgb(211,211,211)",
      },
    },
  },
});

const App = () => (
  <>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Students />
      </QueryClientProvider>
    </ThemeProvider>
  </>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
