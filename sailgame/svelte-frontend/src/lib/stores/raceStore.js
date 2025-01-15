import { writable } from "svelte/store";

export const races = writable([]);

export const fetchRaces = async (session) => {
  const response = await fetch("http://localhost:3000/api/races", {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });
  const data = await response.json();
  races.set(data);
};
