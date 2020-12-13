import React from "react";
import { Select, MenuItem, FormControl } from "@material-ui/core";
import Loading from "../loading";
import { useCategoriesQuery } from "./useCategoriesQuery";
import "./selectCategories.css";

const SelectCategories = ({ selectedCategory, onCategorySelect }) => {
  const { loading, error, data: categories } = useCategoriesQuery();

  if (loading) return <Loading />;
  if (error) return <p>Oops! No se pudieron cargar las categorías</p>;

  const handleCategorySelect = (event) => {
    const category = event.target.value;
    onCategorySelect(category);
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
