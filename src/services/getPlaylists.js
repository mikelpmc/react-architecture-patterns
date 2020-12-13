import clientApi from "../client-api/";

const getPlaylists = (categoryId) => {
  return clientApi.getPlaylists(categoryId).then((res) => {
    const playlists = res.playlists && res.playlists.items;
    if (!playlists) throw Error("No playlists found");

    return playlists;
  });
};

export default getPlaylists;
