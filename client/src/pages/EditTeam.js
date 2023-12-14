import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useGet from "../hooks/use-get";
import Loader from "../components/Loader";
import Error from "../components/Error";
import usePut from "../hooks/use-put";
import Modal from "../components/Modal";

export default function EditTeam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // TEAM DATA
  const {
    data: teamData,
    isLoading: isTeamLoading,
    error: teamError,
  } = useGet(["teams", id], `http://localhost:3001/api/items/${id}`);

  const [formData, setFormData] = useState({
    name: "",
    country: "",
  });

  useEffect(() => {
    if (teamData) {
      setFormData((prevData) => ({
        ...prevData,
        name: teamData.name,
        country: teamData.country,
      }));
    }
  }, [teamData]);

  // FORM DATA
  const [formError, setFormError] = useState();

  const isNameValid = !!formData.name;
  const isCountryValid = !!formData.country;
  let isFormValid = isNameValid && isCountryValid;

  const [classes, setClasses] = useState({ name: "", country: "" });

  // UPDATING DATA
  const { updateMutate, isUpdating, isUpdateSuccess, updateError } = usePut(
    ["teams"],
    `http://localhost:3001/api/items/${id}`,
    formData
  );

  // FUNCTIONS
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      // e.preventDefault();

      console.log("form invalid");
      setClasses({
        name: isNameValid ? "" : "invalid",
        country: isCountryValid ? "" : "invalid",
      });
      const invalidNameOnly = !isNameValid && isCountryValid;
      const invalidCountryOnly = !isCountryValid && isNameValid;
      const bothInvalid = !isNameValid && !isCountryValid;
      const field = bothInvalid
        ? "name and country"
        : invalidNameOnly
        ? "name"
        : invalidCountryOnly
        ? "country"
        : "";
      setFormError(`Incomplete ${field}${bothInvalid ? " fields" : " field"}`);
    } else {
      // if form is valid
      updateMutate();
    }
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/items/${teamData._id}`, {
      method: "DELETE",
    }).catch((err) => {
      console.log(err);
    });
    console.log(`${teamData.name} deleted!`);
    navigate("/");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // RENDERERS
  function refreshHandler() {
    window.location.reload();
  }

  if (!teamData || isTeamLoading) {
    if (teamError) {
      return <Error error={teamError} />;
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
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2>Delete Team</h2>
          <p>Confirm team deletion? This action could not be undone.</p>
          <div className="d-flex justify-content-around">
            <button className="btn btn-secondary col-5" onClick={closeModal}>
              Cancel
            </button>
            <form
              action={`http://localhost:3001/api/items/${teamData._id}?_method=DELETE`}
              method="POST"
              className="d-inline-block col-5"
              onSubmit={deleteHandler}
            >
              <button className="btn btn-danger col-12">Delete</button>
            </form>
          </div>
        </Modal>
      )}
      <h1>Edit team</h1>
      <form
        action={`http://localhost:3001/api/items/${teamData._id}`}
        method="post"
        onSubmit={submitHandler}
        className="d-inline-block"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={changeHandler}
          className={classes.name}
          value={formData.name}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          onChange={changeHandler}
          className={classes.country}
          value={formData.country}
        />
        <button
          className="btn btn-success btn-sm mb-1 ms-2"
          disabled={isUpdating}
        >
          {isUpdating ? <Loader message="Submitting" /> : "Update team"}
        </button>
      </form>
      <button
        className="btn btn-sm btn-danger mb-1 ms-2"
        disabled={isUpdating}
        onClick={openModal}
      >
        Delete team
      </button>

      {formError ? (
        <p>{formError}</p>
      ) : (
        <>
          <br />
          <br />
        </>
      )}

      <div className="buttons">
        <Link
          to={`/${teamData._id}`}
          className={`btn btn-secondary ${isUpdating && "disabled"}`}
        >
          Show team
        </Link>

        <Link
          to="/"
          className={`btn btn-primary ms-2 ${isUpdating && "disabled"}`}
        >
          Back to menu
        </Link>
      </div>

      <br />

      {isUpdating ? (
        <h2>Updating team...</h2>
      ) : (
        <>
          {updateError && <h2>{updateError.message}</h2>}
          {isUpdateSuccess && <h2>Successfully updated!</h2>}
        </>
      )}
    </>
  );
}
