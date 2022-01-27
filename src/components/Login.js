import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

export default function Login() {
  const {
    auth: { isAuthenticated },
    setAuth,
  } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) return navigate("/");
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      // Add user
      const res = await fetch(`http://localhost:5000/users/${email}`);

      const data = await res.json();
      //console.log({ res, data });
      if (res.status !== 200 || data.length === 0) {
        setError("No user Found ");
        setTimeout(() => setError(""), 3000);
        return;
      }
      if (res.status === 200) {
        const loc = await fetch(`http://localhost:5000/locations`);
        const locations = await loc.json();
        //console.log({ loc, locations });
        setAuth({ user: { ...data[0] }, isAuthenticated: true, locations });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      className="container_back auth_box"
      display="flex"
      flexDirection="column"
      alignItems="center"
      borderRadius="30px"
      maxWidth="500px"
      p="25px"
    >
      <h4>Login</h4>
      <Box
        maxWidth="400px"
        width="100%"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {error && <p>{error}</p>}
        <TextField
          required={true}
          type="email"
          fullWidth
          size="small"
          label={"Email"}
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required={true}
          label={"Password"}
          type="password"
          fullWidth
          size="small"
          margin="dense"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <Typography component="p" my="10px">
          <Link to="/register">New Registration</Link>
          <br />
          <Link to="/register">Forgor Password ?</Link>
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: "#40514e" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
