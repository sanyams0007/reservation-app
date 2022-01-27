import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import HOCContainer from "./HOCContainer";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const PlanJourney = () => {
  const {
    auth: { user, locations },
  } = useAuth();

  const Min = new Date(Date.now()).toISOString().split("T")[0];

  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [doj, setDOJ] = useState(Min);
  const [location, setLocation] = useState(locations || []);

  const defaultProps = {
    options: location.map(({ name }) => name),
  };

  //setBookings((prev) => prev.filter((b) => b.id !== id))
  /* const removeSelected = () => {
    setLocation((loc) => loc.filter((l) => l !== source || l !== destination));
  }; */
  /* useEffect(() => {
    console.log({ source, destination, doj, uid: user?.id });
  }, [source, destination, doj]); */

  const handleSubmit = async () => {
    if (source.trim() && destination.trim()) {
      try {
        const res = await fetch("http://localhost:5000/journeys", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ source, destination, uid: user?.id, doj }),
        });

        //const data = await res.json();
        //console.log(data);
        setDestination("");
        setSource("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Box
        className="container_back "
        sx={{
          borderRadius: 2,
          p: "20px",
          maxWidth: 500,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4 style={{ alignSelf: "center" }}>Plan Journey</h4>

        <Autocomplete
          {...defaultProps}
          id="auto-complete"
          autoComplete
          includeInputInList
          value={source}
          onChange={(event, newValue) => {
            setSource(newValue);
            //setLocation((loc) => loc.filter((l) => l !== newValue));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              size="small"
              label={"Source"}
              margin="dense"
              required
            />
          )}
        />

        <Autocomplete
          {...defaultProps}
          id="auto-complete"
          autoComplete
          includeInputInList
          value={destination}
          onChange={(event, newValue) => {
            setDestination(newValue);
            //setLocation((loc) => loc.filter((l) => l !== newValue));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              size="small"
              label={"Destination"}
              margin="dense"
              required
            />
          )}
        />

        <TextField
          fullWidth
          type="date"
          value={doj}
          inputProps={{ min: Min }}
          onChange={(e) => setDOJ(e.target.value)}
          size="small"
          margin="dense"
          required
        />

        <Button
          sx={{ bgcolor: "#40514e" }}
          onClick={handleSubmit}
          variant="contained"
        >
          Book Journey
        </Button>
      </Box>
    </>
  );
};

export default HOCContainer(PlanJourney);

/* 

options: [
      "The Shawshank Redemption",
      "The Godfather",
      "The Godfather: Part II",
      "The Dark Knight",
      "12 Angry Men",
      "Schindler's List",
      "Pulp Fiction",
      "The Lord of the Rings: The Return of the King",
      "The Good, the Bad and the Ugly",
      "Fight Club",
      "The Lord of the Rings: The Fellowship of the Ring",
      "Star Wars: Episode V - The Empire Strikes Back",
      "Forrest Gump",
      "Inception",
      "The Lord of the Rings: The Two Towers",
      "One Flew Over the Cuckoo's Nest",
      "Goodfellas",
      "The Matrix",
      "Seven Samurai",
    ],

*/
