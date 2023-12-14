import React from "react";
import { useForm } from "react-hook-form";

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // console.log(watch()); // shows current data

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("Submitted data: ", data);
        console.log(errors);
        reset();
      })}
    >
      <h2>Form Hooks Usage</h2>
      <div className="d-flex align-items-start">
        <label htmlFor="">
          <input
            className={errors.name ? "invalid" : ""}
            type="text"
            {...register("name", { required: "You need a name!" })}
            placeholder="Name"
          />
          {errors.name && <p className="m-0">{errors.name.message}</p>}
        </label>
        <label htmlFor="">
          <input
            className={errors.age ? "invalid" : ""}
            type="number"
            placeholder="Age"
            {...register("age", { required: "Insert an age!" })}
          />
          {errors.age && <p>{errors.age.message}</p>}
        </label>
        <button className="btn btn-success">Submit</button>
      </div>
      {/* {errors.name && errors.age && <p>{`${errors.name.message}`}</p>} */}
    </form>
  );
}
