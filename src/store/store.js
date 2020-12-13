import { useEffect, useState } from "react";
import { getCategories, getPlaylists } from "../services";

const subscribers = {};

export const subscribe = (type, action) => {
  if (!subscribers[type]) {
    subscribers[type] = [];
  }

  subscribers[type].push(action);
};

export const publish = (type, data) => {
  subscribers[type].forEach((action) => action(data));
};

const useStore = ({ subscribedTo = "categories" }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);

  useEffect(() => {
    const action =
      subscribedTo === "categories" ? handleGetCategories : handleGetPlaylists;
    subscribe(subscribedTo, action);
  }, [subscribedTo]);

  const handleGetCategories = async () => {
    setLoadingCategories(true);
    setCategories([]);

    try {
      const categories = await getCategories();
      setCategories(categories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleGetPlaylists = async (category) => {
    setLoadingPlaylists(true);
    setPlaylists([]);

    try {
      const playlists = await getPlaylists(category);
      setPlaylists(playlists);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPlaylists(false);
    }
  };

  return {
    categories,
    loadingCategories,
    playlists,
    loadingPlaylists,
  };
};

export { useStore };
