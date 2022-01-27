import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import HOCContainer from "./HOCContainer";
import { useAuth } from "../contexts/AuthContext";
import CustomInput from "./CustomInput";
import EventIcon from "@mui/icons-material/Event";
import Pagination from "@mui/material/Pagination";

const Dashboard = () => {
  const {
    auth: { user },
  } = useAuth();

  const [key, setKey] = useState("");
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const bookingsPerPage = 5;
  const pages = bookings && Math.ceil(bookings.length / bookingsPerPage);

  const deleteBooking = async (id) => {
    const res = await fetch(`http://localhost:5000/journeys/${id}`, {
      method: "DELETE",
    });

    //We should control the response status to decide if we will change the state or not.
    if (res.status === 200) {
      setBooking((prev) => prev.filter((b) => b.id !== id));
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } else alert("Error Deleting This Task");
  };

  //console.log({ pages, currentPage });

  useEffect(() => {
    const getBookings = async () => {
      const url =
        user?.role === "admin"
          ? "http://localhost:5000/journeys"
          : `http://localhost:5000/journeys?uid=${user?.id}`;
      const res = await fetch(url);
      const data = await res.json();
      //console.log(data);
      setBookings(data);
    };

    getBookings();
  }, []);

  useEffect(() => {
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = bookings.slice(
      indexOfFirstBooking,
      indexOfLastBooking
    );
    setBooking(currentBookings);
  }, [currentPage, bookings, pages]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Box
        className="container_back"
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          p: 2,
          maxWidth: 600,
          width: "100%",
        }}
      >
        <h4 style={{ alignSelf: "center" }}>Dashboard</h4>
        {user?.role === "admin" && (
          <>
            <CustomInput />
            <div className="orline">
              <hr className="line" />
              <div> OR </div>
              <hr className="line" />
            </div>
          </>
        )}

        <p>Here are your Bookings</p>

        <TextField
          value={key}
          onChange={(e) => setKey(e.target.value.toLowerCase())}
          size="small"
          label={"Search by Source or Destination"}
          margin="normal"
        />

        <List dense={true}>
          {booking
            .filter(
              ({ source, destination }) =>
                source.toLowerCase().includes(key) ||
                destination.toLowerCase().includes(key)
            )
            .map((booking) => (
              <ListItem
                className="booking_item"
                key={booking?.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => deleteBooking(booking?.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "rgba(0,0,0,.54)" }}>
                    <EventIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Source: ${booking?.source} --- Destination: ${booking?.destination}`}
                  secondary={`DOJ: ${booking?.doj}`}
                />
              </ListItem>
            ))}
        </List>
        {pages > 1 && (
          <Pagination
            page={currentPage}
            defaultPage={1}
            count={pages}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        )}
      </Box>
    </>
  );
};

export default HOCContainer(Dashboard);
