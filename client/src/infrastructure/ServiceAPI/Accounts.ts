export const login = async (email: string, password: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ROOT}/api/v1/login`,
    {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const json = await response.json();
  return json;
};
