import { useEffect, useState } from "react";
import { getCategories } from "../../services";

const useCategoriesQuery = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleGetCategories = async () => {
    setCategories([]);
    setLoading(true);
    setError(false);

    try {
      const categories = await getCategories();
      setCategories(categories);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  return { loading, error, data: categories };
};

export { useCategoriesQuery };
