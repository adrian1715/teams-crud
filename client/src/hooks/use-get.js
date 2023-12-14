import React from "react";

import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query"; // just in case

export default function useGet(key, url) {
  return useQuery({
    queryKey: key,
    queryFn: () => fetchTeams(url),
  });
}

export const fetchTeams = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.code = res.status;
    error.info = res.statusText;
    // error.info = await res.json();
    throw error;
  }

  const data = await res.json();
  return data;
};
