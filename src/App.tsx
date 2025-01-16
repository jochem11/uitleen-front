import { StyledEngineProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { HelmetProvider } from "react-helmet-async";
import { IntlProvider } from "react-intl";
import Routes from "./Routes";
import ThemeProvider from "./ThemeProvidor";
import ToastProvider from "./ToastProvider";

function App() {
  return (
    <IntlProvider locale="nl" timeZone="Europe/Amsterdam">
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <LocalizationProvider>
            <ToastProvider>
              <HelmetProvider>
                <Routes />
              </HelmetProvider>
            </ToastProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </IntlProvider>
  );
}

export default App;

