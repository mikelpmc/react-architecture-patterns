import React, { useEffect } from "react";
import SelectCategories from "../selectCategories/";
import Typography from "@material-ui/core/Typography";
import Playlists from "../playlists";
import { inspect } from "@xstate/inspect";
import { useMachine } from "@xstate/react";
import categoriesMachine from "../selectCategories/categoriesMachine";
import { getCategories } from "../../services";
import "./home.css";

inspect({
  url: "https://statecharts.io/inspect",
});

const Home = () => {
  const [state, send] = useMachine(categoriesMachine, {
    devTools: true,
    services: {
      getCategories,
    },
  });

  useEffect(() => {
    send("FETCH");
  }, [send]);

  const handleCategorySelect = (category) => {
    if (category !== -1) {
      send("SELECT_CATEGORY", { category });
    }
  };

  const { playlistsMachine } = state.context;

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
      <Typography gutterBottom variant="h5" align="center" color="primary">
        Xstate example
      </Typography>
      <SelectCategories
        state={state}
        onCategorySelect={handleCategorySelect}
        onRetry={() => send("RETRY")}
      />
      {playlistsMachine && <Playlists service={playlistsMachine} />}
    </main>
  );
};

export default Home;
