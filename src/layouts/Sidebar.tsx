import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, ButtonBase } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import LogoRocNijmegen from "../assets/LogoRocNijmegen.svg";
import { useLocation } from "wouter";
import DeviceHubIcon from '@mui/icons-material/DeviceHub';

const Sidebar = () => {
  const [_, setLocation] = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ padding: "16px", display: "flex", justifyContent: "center" }}>
          <img src={LogoRocNijmegen} alt="Logo" />
        </Box>
        <List>
          <ButtonBase sx={{ width: "100%" }} onClick={() => setLocation("/")}>
            <ListItem sx={{ width: "100%" }}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </ButtonBase>

          <ButtonBase sx={{ width: "100%" }} onClick={() => setLocation("/items")}>
            <ListItem sx={{ width: "100%" }}>
              <ListItemIcon>
                <DeviceHubIcon />
              </ListItemIcon>
              <ListItemText primary="items" />
            </ListItem>
          </ButtonBase>

          <ButtonBase sx={{ width: "100%" }} onClick={() => setLocation("/users")}>
            <ListItem sx={{ width: "100%" }}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Gebruikers" />
            </ListItem>
          </ButtonBase>

          <ButtonBase sx={{ width: "100%" }} onClick={() => setLocation("/lends")}>
            <ListItem sx={{ width: "100%" }}>
              <ListItemIcon>
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Uitgiften" />
            </ListItem>
          </ButtonBase>
        </List>
        <Box sx={{ marginTop: "auto" }}>
          <Divider />
          <List>
            <ListItem>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="log out" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;

