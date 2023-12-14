import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../App";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function usePut(queryKey, url, newData) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: () => updateTeam(url, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
        // refetchType: "none",
      });
      if (pathname === `/${id}/edit`) window.location.href = `/${id}`; // to refresh the page and make data to be updated
      if (location === "/new") navigate("/");
      // navigate(`/${id}`);
    },
    // cacheTime: 0,
  });
  return {
    updateMutate: mutate,
    isUpdating: isPending,
    isUpdateSuccess: isSuccess,
    updateError: error,
  };
}

export const updateTeam = (url, newData) => {
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...newData,
    }),
  });
};
