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
        variant="h4"
        component="h4"
        align="center"
        color="primary"
      >
        Spotify App - React Architecture Patterns
      </Typography>
      <Typography gutterBottom variant="h5" align="center" color="primary">
        Pub sub pattern
      </Typography>
      <SelectCategories />
      <Playlists />
    </main>
  );
};

export default Home;
