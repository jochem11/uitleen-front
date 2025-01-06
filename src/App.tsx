import { StyledEngineProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { HelmetProvider } from "react-helmet-async";
import { IntlProvider } from "react-intl";
import Routes from "./Routes";
import ThemeProvider from "./ThemeProvidor";

function App() {
  return (
    <IntlProvider locale="nl" timeZone="Europe/Amsterdam">
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <LocalizationProvider>
            {/*snackbarProvider? */}
            <HelmetProvider>
              <Routes />
            </HelmetProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </IntlProvider>
  );
}

export default App;

