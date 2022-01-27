import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { pathname } = useLocation();
  const {
    auth: { user },
    setAuth,
  } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "coral" }}>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              fontFamily: "Merriweather",
              flexGrow: 1,
            }}
          >
            FakeResrvations
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pathname && pathname.replace("/", "").toUpperCase()}
          </Typography>
          <span
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              paddingRight: "5px",
            }}
          >
            {user?.email}
          </span>
          <Button
            sx={{ bgcolor: "#40514e" }}
            variant="contained"
            onClick={() => setAuth({})}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
