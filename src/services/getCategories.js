import clientApi from "../client-api/";

const getCategories = () => {
  return clientApi.getCategories().then((res) => {
    const categories = res.categories && res.categories.items;
    if (!categories) throw Error("No categories found");

    return categories;
  });
};

export default getCategories;
