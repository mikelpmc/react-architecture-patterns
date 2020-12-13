import { useEffect, useState } from "react";
import { getPlaylists } from "../../services";

const usePlaylistsQuery = (category) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleGetPlaylists = async () => {
    setPlaylists([]);
    setLoading(true);
    setError(false);

    try {
      const playlists = await getPlaylists(category);
      setPlaylists(playlists);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category === -1) {
      setPlaylists([]);
    } else {
      handleGetPlaylists();
    }
  }, [category]);

  return { loading, error, data: playlists };
};

export { usePlaylistsQuery };
