import React from "react";
import { Select, MenuItem, FormControl } from "@material-ui/core";
import "./selectCategories.css";

const SelectCategories = ({ state, onCategorySelect, onRetry }) => {
  const handleOnChange = (event) => {
    const category = event.target.value;

    onCategorySelect(category);
  };

  if (state.matches("loading")) return <p>Cargando...</p>;
  if (state.matches("error")) return <p>Whoops! Error</p>;

  const { categories, selectedCategory } = state.context;

  return (
    <div className="select-container">
      <FormControl>
        <Select
          value={selectedCategory}
          onChange={handleOnChange}
          variant="outlined"
        >
          <MenuItem value={-1}>Selecciona una categoría</MenuItem>
          {state.matches("success") &&
            categories.map(({ id, name }) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
        </Select>
        {state.matches("error") && <button onClick={onRetry}>Retry</button>}
      </FormControl>
    </div>
  );
};

export default SelectCategories;
