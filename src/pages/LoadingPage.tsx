import { CircularProgress, Grid2, Typography } from "@mui/material";
import Page from "./Page";

const LoadingPage = ({ text = "Pagina aan het laden" }) => {
  return (
    <Page>
      <Grid2 container direction="column" alignContent="center" alignItems="center" justifyContent="center" spacing={4}>
        <Grid2>
          <Typography variant="h3" component="h1" color="primairy">
            {text}
          </Typography>
        </Grid2>
        <Grid2>
          <CircularProgress />
        </Grid2>
      </Grid2>
    </Page>
  );
};

export default LoadingPage;
