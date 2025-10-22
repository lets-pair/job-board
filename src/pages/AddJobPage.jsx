import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorInput from "@/components/ErrorInput";
import { useForm } from "react-hook-form";

const canadianProvinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Northwest Territories",
  "Nunavut",
  "Yukon",
];

const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const AddJobPage = ({ addJobSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      title: "",
      description: "",
      location: "",
      salary: "",
    },
  });

  const countryState = watch("location.country");
  const isCanada = countryState === "Canada";

  const onSubmit = (data) => {
    addJobSubmit(data);
    toast.success("Job added successfully");
    return navigate("/jobs");
  };
  const navigate = useNavigate();

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Job Type
              </label>
              <select
                {...register("type", { required: "Job Type is required" })}
                id="type"
                className="border rounded w-full py-2 px-3"
              >
                <option value="">Select</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
              {errors.type?.message && (
                <ErrorInput message={errors.type?.message} />
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Job Listing Name
              </label>

              <input
                {...register("title", {
                  required: "Title is required",
                  maxLength: 90,
                })}
                id="title"
                type="text"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Beautiful Apartment In Miami"
              />

              {errors.title?.message && (
                <ErrorInput message={errors.title?.message} />
              )}
              {errors.title?.type === "maxLength" && (
                <ErrorInput
                  message={"Your title exceeds the max length of 90 characters"}
                />
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: 120,
                })}
                id="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add any job duties, expectations, requirements, etc"
              ></textarea>

              {errors.description?.message && (
                <ErrorInput message={errors.description?.message} />
              )}
              {errors.description?.type === "minLength" && (
                <ErrorInput message="The minimum length should be 120 characters" />
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="salary"
                className="block text-gray-700 font-bold mb-2"
              >
                Salary
              </label>
              <select
                {...register("salary", { required: "Salary is required" })}
                id="salary"
                className="border rounded w-full py-2 px-3"
              >
                <option value="Under $50K">Under $50K</option>
                <option value="$50K - 60K">$50K - $60K</option>
                <option value="$60K - 70K">$60K - $70K</option>
                <option value="$70K - 80K">$70K - $80K</option>
                <option value="$80K - 90K">$80K - $90K</option>
                <option value="$90K - 100K">$90K - $100K</option>
                <option value="$100K - 125K">$100K - $125K</option>
                <option value="$125K - 150K">$125K - $150K</option>
                <option value="$150K - 175K">$150K - $175K</option>
                <option value="$175K - 200K">$175K - $200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
              {errors.salary?.message && (
                <ErrorInput message={errors.salary?.message} />
              )}
            </div>

            <fieldset>
              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Country
                </label>
                <select
                  {...register("location.country", {
                    required: "Country is required",
                  })}
                  id="country"
                  className="border rounded w-full py-2 px-3"
                >
                  <option value="Canada">Canada</option>
                  <option value="USA">USA</option>
                </select>
                {errors.country?.message && (
                  <ErrorInput message={errors.country?.message} />
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="state"
                  className="block text-gray-700 font-bold mb-2"
                >
                  {isCanada ? "Province" : "State"}
                </label>

                <select
                  {...register("location.stateCode", {
                    required: `${isCanada ? "Province" : "State"} is required`,
                  })}
                  id="state"
                  className="border rounded w-full py-2 px-3"
                >
                  {isCanada
                    ? canadianProvinces.map((province, index) => (
                        <option value={province} key={index}>
                          {province}
                        </option>
                      ))
                    : usStates.map((state, index) => (
                        <option value={state} key={index}>
                          {state}
                        </option>
                      ))}
                </select>
                {errors.state?.message && (
                  <ErrorInput message={errors.state?.message} />
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  City
                </label>
                <input
                  {...register("location.city", {
                    required: "City is required",
                  })}
                  id="city"
                  type="text"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Company city"
                />
                {errors.city?.message && (
                  <ErrorInput message={errors.city?.message} />
                )}
              </div>
            </fieldset>

            <h3 className="text-2xl mb-5">Company Info</h3>

            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Name
              </label>
              <input
                {...register("company")}
                type="text"
                id="company"
                className="border rounded w-full py-2 px-3"
                placeholder="Company Name"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="company_description"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Description
              </label>
              <textarea
                {...register("company_description")}
                id="company_description"
                className="border rounded w-full py-2 px-3"
                rows="4"
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="contact_email"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Email
              </label>
              <input
                {...register("contact_email")}
                type="email"
                id="contact_email"
                className="border rounded w-full py-2 px-3"
                placeholder="Email address for applicants"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contact_phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Phone
              </label>
              <input
                {...register("contact_phone")}
                type="tel"
                id="contact_phone"
                className="border rounded w-full py-2 px-3"
                placeholder="Optional phone for applicants"
              />
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default AddJobPage;
