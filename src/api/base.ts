export const SERVER_URL = "https://afternoon-falls-25894.herokuapp.com";

export const baseFetch = async (url: string) => {
  const response = await fetch(SERVER_URL + url, {
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    return await response.json();
  }
  throw new Error(await response.text());
};
