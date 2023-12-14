import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { useForm } from "react-hook-form";
import Modal from "../components/Modal";
import { queryClient } from "../App";

export default function NewTeam() {
  const navigate = useNavigate();

  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: addTeam,
    onSuccess: () => {
      console.log("successfully added!");
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formError },
    reset,
  } = useForm();

  // console.log(watch()); // to check form data if needed

  const submitHandler = (formData) => {
    // console.log("Submitted data: ", formData);

    // WITHOUT MUTATIONS
    // addTeam({ formData });

    // USING MUTATIONS
    mutate({ formData });
  };

  return (
    <Modal>
      <h1>Add new team</h1>
      <form
        // action="http://localhost:3001/api/items"
        // method="post"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="d-flex align-items-start">
          <label htmlFor="">
            <input
              type="text"
              placeholder="Name"
              className={formError.name && "invalid"}
              {...register("name", { required: "You need a name!" })}
            />
            {formError.name && <p className="m-0">{formError.name.message}</p>}
          </label>
          <label htmlFor="">
            <input
              type="text"
              placeholder="Country"
              className={formError.country && "invalid"}
              {...register("country", {
                required: "Incomplete country field!",
              })}
            />
            {formError.country && (
              <p className="m-0">{formError.country.message}</p>
            )}
          </label>
          <button disabled={isPending} className="btn btn-sm btn-success ms-2">
            {isPending ? <Loader message="Submitting" /> : "Register team"}
          </button>
        </div>
      </form>

      {!isPending && (
        <Link to="/" className="mt-3 btn btn-primary">
          Cancel
        </Link>
      )}
      {error && <Error error={error} />}
    </Modal>
  );
}

async function addTeam({ formData }) {
  const res = await axios
    .post("http://localhost:3001/api/items", formData, {
      "Content-Type": "application/json",
    })
    .catch((err) => console.log(err));

  // on success - without using tanstack query mutations
  // if (res.status === 200) {
  //   console.log("successfully added");
  //   window.location.href = "/";
  // }
}
