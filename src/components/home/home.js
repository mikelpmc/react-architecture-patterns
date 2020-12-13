import React, { useState } from "react";
import SelectCategories from "../selectCategories/";
import Typography from "@material-ui/core/Typography";
import Playlists from "../playlists";
import "./home.css";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(-1);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

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
        Query hook pattern
      </Typography>
      <SelectCategories
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      <Playlists category={selectedCategory} />
    </main>
  );
};

export default Home;
