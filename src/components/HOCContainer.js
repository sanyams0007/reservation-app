import Box from "@mui/material/Box";
import Header from "./Header";
import SideNav from "./SideNav";

const HOCContainer = (Component) => (props) => {
  const Nav = () => {
    return (
      <>
        <Header />
        <SideNav />
      </>
    );
  };
  return (
    <>
      <Nav />
      <Box
        className="main_content"
        display="flex"
        flexDirection="column"
        alignItems="center"
        pl="150px"
        pt="40px"
      >
        <Component {...props} />
      </Box>
    </>
  );
};

export default HOCContainer;
