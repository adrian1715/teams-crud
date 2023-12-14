import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import useGet, { fetchTeams } from "../hooks/use-get";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../App";

export default function ShowTeam() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: teamData,
    isLoading,
    error,
  } = useGet(["teams", id], `http://localhost:3001/api/items/${id}`);

  function refreshHandler() {
    window.location.reload();
  }

  if (!teamData || isLoading) {
    if (error) {
      return <Error error={error} />;
    }
    return (
      <div className="d-flex">
        <Loader message="Loading team..." />
        <button className="ms-3 btn btn-success" onClick={refreshHandler}>
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <>
      <h1>{`${teamData.name} - ${teamData.country}`}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
        maiores, sed libero optio deserunt deleniti. Placeat laudantium eos,
        saepe iure modi molestiae aliquam consectetur error blanditiis expedita
        officiis optio magnam!
      </p>
      <div className="buttons">
        <Link to="/" className="btn btn-primary">
          All teams
        </Link>
        <Link to={`/${teamData._id}/edit`} className="btn btn-secondary ms-2">
          Edit team
        </Link>
      </div>
    </>
  );
}
