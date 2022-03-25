const SERVER_URL = 'https://aelx-rmoan-unexpert-rs-lang.herokuapp.com';

export const baseFetch = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(SERVER_URL + url, options);
  if (response.ok) {
    return await response.json();
  }
  throw new Error(await response.text());
};
