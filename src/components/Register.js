import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
export default function Register() {
  const {
    auth: { isAuthenticated },
    setAuth,
  } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCPwd] = useState("");

  useEffect(() => {
    if (isAuthenticated) return navigate("/");
  }, [isAuthenticated, navigate]);

  const handleRegister = async () => {
    if (email && phone && pwd && cpwd && pwd === cpwd) {
      try {
        const res = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, pwd, phone, role: "user" }),
        });

        const data = await res.json();
        // console.log(data);
        setAuth({ ...data, isAuthenticated: true });
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("fill all detail and enter same pass");
    }
  };

  return (
    <Box
      className="container_back auth_box"
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth="500px"
      borderRadius="30px"
      p="25px"
    >
      <h4>Register</h4>

      <Box
        width="400px"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          required={true}
          type="email"
          inputMode="email"
          fullWidth
          size="small"
          label={"Email"}
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required={true}
          type="tel"
          fullWidth
          size="small"
          label={"Phone"}
          margin="dense"
          value={phone}
          inputProps={{ maxLength: "10" }}
          onChange={(e) => setPhone(e.target.value)}
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
        <TextField
          required={true}
          label={"Confirm Password"}
          type="password"
          fullWidth
          size="small"
          margin="dense"
          value={cpwd}
          onChange={(e) => setCPwd(e.target.value)}
        />

        <Typography sx={{ alignSelf: "flex-end" }} component="p" my="10px">
          <Link to="/login">Login</Link>
        </Typography>

        <Button
          onClick={handleRegister}
          variant="contained"
          sx={{ bgcolor: "#40514e" }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}
