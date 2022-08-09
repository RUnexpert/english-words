export const SERVER_URL = "https://aelx-rmoan-unexpert-rs-lang.herokuapp.com";

export const baseFetch = async (url: string) => {
  const response = await fetch(SERVER_URL + url, {
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    return await response.json();
  }
  throw new Error(await response.text());
};
