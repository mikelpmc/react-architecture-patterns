import React from "react";
import SelectCategories from "../selectCategories/";
import Typography from "@material-ui/core/Typography";
import Playlists from "../playlists";
import "./home.css";

const Home = () => {
  return (
    <main className="container">
      <Typography
        gutterBottom
        variant="h3"
        component="h2"
        align="center"
        color="primary"
      >
        Spotify App - React Architecture Patterns
      </Typography>
      <SelectCategories />
      <Playlists />
    </main>
  );
};

export default Home;
