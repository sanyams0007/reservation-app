import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../contexts/AuthContext";

export default function CustomInput() {
  const { setAuth } = useAuth();
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (location && location.trim()) {
      try {
        const res = await fetch("http://localhost:5000/locations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: location }),
        });

        //const data = await res.json();
        //console.log(data);
        setAuth((prevData) => ({
          ...prevData,
          locations: [...prevData.locations, { name: location }],
        }));
        setLocation("");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("please input data");
    }
  };

  return (
    <Paper
      onSubmit={handleSubmit}
      component="form"
      sx={{
        p: "0px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        my: 2,
      }}
    >
      <InputBase
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Add New Location"
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" color="primary" sx={{ p: "10px" }}>
        <AddIcon />
      </IconButton>
    </Paper>
  );
}
