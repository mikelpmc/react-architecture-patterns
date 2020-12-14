import React from "react";
import { useService } from "@xstate/react";
import Card, { Content, Header } from "../card";
import { Grid, Typography, CardMedia } from "@material-ui/core";
import Loading from "../loading";
import "./playlists.css";

const Playlists = ({ service }) => {
  const [state] = useService(service);

  const { playlists } = state.context;

  if (state.matches("loading")) return <Loading />;
  if (state.matches("error")) return <p>Whoops! Error</p>;

  return (
    <div className="playlists-container">
      <Grid container spacing={1} alignItems="stretch">
        {state.matches("success") &&
          playlists.map((playlist) => {
            const image =
              playlist.images && playlist.images[0] && playlist.images[0].url;

            return (
              <Grid item md={2} key={playlist.id}>
                <Card>
                  <Header>
                    <CardMedia
                      component="img"
                      alt={playlist.name}
                      height="140"
                      image={image}
                      title={playlist.name}
                    />
                  </Header>
                  <Content>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="h3"
                      align="center"
                    >
                      {playlist.name}
                    </Typography>
                  </Content>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default Playlists;
