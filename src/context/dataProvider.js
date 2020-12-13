import React, { createContext, useContext, useEffect, useState } from "react";
import { getCategories, getPlaylists } from "../services";

const DataStateContext = createContext();
const DataActionsContext = createContext();

const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(-1);

  const handleFetchCategories = async () => {
    try {
      const categories = await getCategories();
      setCategories(categories);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchCategoryPlaylists = async (category) => {
    try {
      const playlists = await getPlaylists(category);
      setPlaylists(playlists);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (selectedCategory === -1) {
      setPlaylists([]);
    } else {
      handleFetchCategoryPlaylists(selectedCategory);
    }
  }, [selectedCategory]);

  const store = {
    categories,
    playlists,
    selectedCategory,
  };

  const actions = {
    fetchCategories: handleFetchCategories,
    selectCategory: handleCategorySelect,
  };

  return (
    <DataStateContext.Provider value={store}>
      <DataActionsContext.Provider value={actions}>
        {children}
      </DataActionsContext.Provider>
    </DataStateContext.Provider>
  );
};

const useDataState = () => {
  const context = useContext(DataStateContext);

  if (context === undefined) {
    throw new Error("useDataState must be used within a DataProvider");
  }

  return context;
};

const useDataActions = () => {
  const context = useContext(DataActionsContext);

  if (context === undefined) {
    throw new Error("useDataActions must be used within a DataProvider");
  }

  return context;
};

export { DataProvider, useDataState, useDataActions };
