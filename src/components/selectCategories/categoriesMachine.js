import { Machine, assign, spawn } from "xstate";
import createPlaylistsMachine from "../playlists/playlistsMachine";

const categoriesMachine = Machine({
  id: "categoriesMachine",
  initial: "idle",
  context: {
    categories: [],
    selectedCategory: -1,
    playlistsMachine: null,
  },
  states: {
    idle: {
      on: {
        FETCH: "loading",
      },
    },
    loading: {
      invoke: {
        id: "fetchCategories",
        src: "getCategories",
        onDone: {
          target: "success",
          actions: assign({
            categories: (_, event) => {
              const categories = event.data;
              return categories;
            },
          }),
        },
        onError: {
          target: "error",
        },
      },
    },
    success: {
      on: {
        SELECT_CATEGORY: {
          actions: assign((_, event) => {
            const playlistsMachine = spawn(
              createPlaylistsMachine(event.category)
            );
            return { selectedCategory: event.category, playlistsMachine };
          }),
        },
      },
    },
    error: {
      on: {
        RETRY: "loading",
      },
    },
  },
});

export default categoriesMachine;
