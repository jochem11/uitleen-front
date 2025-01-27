import { StyledEngineProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { HelmetProvider } from "react-helmet-async";
import { IntlProvider } from "react-intl";
import Routes from "./Routes";
import ThemeProvider from "./ThemeProvidor";
import ToastProvider from "./ToastProvider";
import { nl } from "date-fns/locale/nl";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

function App() {
  return (
    <IntlProvider locale="nl" timeZone="Europe/Amsterdam">
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={nl}>
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

