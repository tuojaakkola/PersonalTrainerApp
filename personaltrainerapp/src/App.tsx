import { Link, Outlet } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function App() {
  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#333" }}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px", 
              width: "100%", 
            }}
          >
            <Button
              component={Link}
              to="/customers"
              variant="outlined"
              style={{ color: "white", borderColor: "white" }}
            >
              Customers
            </Button>
            <Button
              component={Link}
              to="/trainings"
              variant="outlined"
              style={{ color: "white", borderColor: "white" }}
            >
              Trainings
            </Button>
            <Button
              component={Link}
              to="/calendar"
              variant="outlined"
              style={{ color: "white", borderColor: "white" }}
            >
              Calendar
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

// This is the main entry point of the application. It sets up the routing and renders the App component.

