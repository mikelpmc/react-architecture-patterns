import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl } from "@material-ui/core";
import Loading from "../loading";
import { useStore, publish } from "../../store/store";
import "./selectCategories.css";

const SelectCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(-1);

  const { categories, loadingCategories } = useStore({
    subscribedTo: "categories",
  });

  useEffect(() => {
    publish("categories");
  }, []);

  if (loadingCategories) return <Loading />;

  const handleCategorySelect = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    publish("playlists", category);
  };

  return (
    <div className="select-container">
      <FormControl>
        <Select
          value={selectedCategory}
          onChange={handleCategorySelect}
          variant="outlined"
        >
          <MenuItem value={-1}>Selecciona una categoría</MenuItem>
          {categories &&
            categories.map(({ id, name }) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectCategories;
