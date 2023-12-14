import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useGet from "../hooks/use-get";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Modal from "../components/Modal";
import MyForm from "../components/MyForm";

export default function Teams() {
  // CONVENTIONAL FETCHING - WITHOUT TANSTACK QUERY
  // const [data, setData] = useState(false);
  // const [isLoading, setIsLoading] = useState();
  // const [error, setError] = useState();
  // useEffect(() => {
  //   async function fetchTeams() {
  //     setIsLoading(true);
  //     const res = await fetch(`http://localhost:3001/api/items`);
  //     if (!res.ok) {
  //       const error = new Error("An error occurred while fetching!");
  //       error.code = res.status;
  //       error.info = await res.json();
  //     }
  //     return await res.json();
  //   }
  //   fetchTeams()
  //     .then((teams) => setData(teams))
  //     .catch((err) => setError(error))
  //     .finally(() => setIsLoading(false));
  // }, []);

  // USING TANSTACK QUERY THROUGH useGet HOOK FOR TEAMS FETCHING
  const { data, isLoading, error } = useGet(
    ["teams"],
    "http://localhost:3001/api/items"
  );

  if (isLoading) {
    return <Loader message="Loading teams..." />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <Outlet />
      <h1>Teams</h1>
      <ul>
        {data &&
          data.map((item, index) => (
            <li key={index}>
              <Link to={`/${item._id}`}>{item.name}</Link>
            </li>
          ))}
      </ul>
      <Link to="/new" className="btn btn-primary">
        Add new team
      </Link>
    </>
  );
}
