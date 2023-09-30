export const fetchProducts = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ROOT}/api/v1/products`,
  );
  const json = await response.json();
  return json;
};

export const fetchProduct = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ROOT}/api/v1/products/${id}`,
  );
  const json = await response.json();
  return json;
};

export const createProduct = async (
  jwt: string,
  title: string,
  description: string,
  price: number,
  imageUrl: string = null,
) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ROOT}/api/v1/products`,
    {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
      },
    },
  );
  const json = await response.json();
  return json;
};
