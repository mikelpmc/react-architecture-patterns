import React, { useEffect } from "react";
import { Select, MenuItem, FormControl } from "@material-ui/core";
import { useDataActions, useDataState } from "../../context/dataProvider";
import "./selectCategories.css";

const SelectCategories = () => {
  const { categories, selectedCategory } = useDataState();
  const { fetchCategories, selectCategory } = useDataActions();

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOnChange = (event) => {
    const categoryId = event.target.value;
    selectCategory(categoryId);
  };

  return (
    <div className="select-container">
      <FormControl>
        <Select
          value={selectedCategory}
          onChange={handleOnChange}
          variant="outlined"
        >
          <MenuItem value={-1}>Selecciona una categoría</MenuItem>
          {categories.map(({ id, name }) => (
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
