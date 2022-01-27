import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SideNav() {
  const {
    auth: { user },
  } = useAuth();
  return (
    <nav className="sidenav">
      <List>
        {user?.role !== "admin" && (
          <ListItem
            disablePadding
            sx={{ borderBottom: "0.5px solid rgba(255,255,255,.2)" }}
          >
            <Link to="/plan" style={{ width: "100%" }}>
              <ListItemButton>
                <ListItemText primary="Plan Journey" />
              </ListItemButton>
            </Link>
          </ListItem>
        )}
        <ListItem
          disablePadding
          sx={{ borderBottom: "0.5px solid rgba(255,255,255,.2)" }}
        >
          <Link to="/dashboard" style={{ width: "100%" }}>
            <ListItemButton>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </nav>
  );
}
