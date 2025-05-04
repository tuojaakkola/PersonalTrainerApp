import { Link, Outlet } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import './App.css';

function App() {
  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#333" }}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px", // Space between buttons
              width: "100%", // Center the buttons horizontally
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

export default App;

