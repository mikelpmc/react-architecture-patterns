import { Machine, assign } from "xstate";
import { getPlaylists } from "../../services";

const createPlaylistsMachine = (category) => {
  return Machine({
    id: "playlistsMachine",
    initial: "loading",
    context: {
      category,
      playlists: [],
    },
    states: {
      loading: {
        invoke: {
          id: "fetchPlaylists",
          src: (context) => getPlaylists(context.category),
          onDone: {
            target: "success",
            actions: assign({
              playlists: (_, event) => event.data,
            }),
          },
          onError: {
            target: "error",
          },
        },
      },
      success: {},
      error: {},
    },
  });
};

export default createPlaylistsMachine;
