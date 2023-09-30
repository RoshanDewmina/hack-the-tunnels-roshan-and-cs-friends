export const fetchProducts = async () => {
  const response = await fetch("http://localhost:5000/api/v1/products");
  const json = await response.json();
  return json.data.products;
};
