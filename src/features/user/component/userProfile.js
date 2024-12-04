import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  myOrderSelector,
  updateUserAddressAsync,
  userInfoSelector,
} from "../userSlice";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function MyProfile() {
  const user = useSelector(userInfoSelector);
  const [editFormIndex, setEditFormIndex] = useState(-1);
  const [addNewAddressForm, setAddNewAddressForm] = useState(false);
    const dispatch = useDispatch();
    
    // TODO: we will add payment section when work on backend
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  function handleEdit(data, index) {
    const address = data;
    // console.log(data)
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, address);
    dispatch(updateUserAddressAsync(newUser));
    reset();
    setEditFormIndex(-1);
  }

  function handleRemove(e, index) {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAddressAsync(newUser));
  }

  function handleEditForm(index) {
    setEditFormIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("country", address.country);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("State", address.State);
    setValue("pinCode", address.pinCode);
  }

  function handleNewAddress(data) {
    dispatch(
      updateUserAddressAsync({ ...user, addresses: [...user.addresses, data] })
    );
    reset();
    setAddNewAddressForm(false);
  }

  return (
    <>
      <div className="flow-root">
        <h1 className="text-4xl mb-4 font-bold tracking-tight text-gray-900">
          Name: {user.name ? user.name : "New User"}
        </h1>
        <h3 className="text-2xl mb-4 font-bold tracking-tight text-red-900">
          Email: {user.email}
        </h3>
      </div>
      <div>
        <button
          type="submit"
          onClick={() => setAddNewAddressForm(true)}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add New Address
        </button>
        {addNewAddressForm ? (
          <form
            className="bg-gray-200 px-5 mt-12 py-7"
            onSubmit={handleSubmit((data) => {
              handleNewAddress(data);
            })}
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className=" text-4xl  font-semibold text-gray-900 sticky top-0">
                  Personal Information
                </h2>
                <p className="text-1xl mt-1 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
                <div
                  style={{
                    maxHeight: "600px", // Set your desired max height
                    overflowY: "auto", // Enable vertical scrolling
                    overflowX: "hidden", // Prevent horizontal scrolling
                    // scrollbarWidth: 'none', // For Firefox (hides scrollbar)
                    // msOverflowStyle: 'none', // For Internet Explorer and Edge
                  }}
                >
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        //   htmlFor="first-name"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        full name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          {...register("name", {
                            required: "full name is require",
                          })}
                          type="text"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone number is required",
                          })}
                          type="tel"
                          autoComplete="family-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>

                      {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          {...register("country", {
                            required: "country is rquired",
                          })}
                          autoComplete="country-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                        >
                          <option>India</option>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>

                      {errors.country && (
                        <p className="text-red-500">{errors.country.message}</p>
                      )}
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="street"
                          {...register("street", {
                            required: "street-address is required",
                          })}
                          type="text"
                          autoComplete="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>

                      {errors.street && (
                        <p className="text-red-500">{errors.street.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          {...register("city", {
                            required: "city is required",
                          })}
                          type="text"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>

                      {errors.city && (
                        <p className="text-red-500">{errors.city.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          id="State"
                          {...register("State", {
                            required: "State is required",
                          })}
                          type="text"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>

                      {errors.State && (
                        <p className="text-red-500">{errors.State.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        ZIP / pin code
                      </label>
                      <div className="mt-2">
                        <input
                          id="pinCode"
                          {...register("pinCode", {
                            required: "pin-code is required",
                          })}
                          type="text"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                      {errors.pinCode && (
                        <p className="text-red-500">{errors.pinCode.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      onClick={() => {
                        reset();
                        setAddNewAddressForm(false);
                      }}
                      className="text-sm/6 font-semibold text-gray-900"
                    >
                      cancle
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      add new Address
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : null}
      </div>

      {user.addresses?.map((address, index) => (
        <div>
          <div className="lg:col-span-3">
            {editFormIndex === index ? (
              <form
                className="bg-gray-200 px-5 mt-12 py-7"
                onSubmit={handleSubmit((data) => {
                  handleEdit(data, index);
                })}
              >
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className=" text-4xl  font-semibold text-gray-900 sticky top-0">
                      Personal Information
                    </h2>
                    <p className="text-1xl mt-1 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>
                    <div
                      style={{
                        maxHeight: "600px", // Set your desired max height
                        overflowY: "auto", // Enable vertical scrolling
                        overflowX: "hidden", // Prevent horizontal scrolling
                        // scrollbarWidth: 'none', // For Firefox (hides scrollbar)
                        // msOverflowStyle: 'none', // For Internet Explorer and Edge
                      }}
                    >
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                          <label
                            //   htmlFor="first-name"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            full name
                          </label>
                          <div className="mt-2">
                            <input
                              id="name"
                              {...register("name", {
                                required: "full name is require",
                              })}
                              type="text"
                              autoComplete="given-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                          </div>
                          {errors.name && (
                            <p className="text-red-500">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Phone Number
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              {...register("phone", {
                                required: "phone number is required",
                              })}
                              type="tel"
                              autoComplete="family-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-red-500">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="email"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register("email", {
                                required: "email is required",
                              })}
                              type="email"
                              autoComplete="email"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                          </div>

                          {errors.email && (
                            <p className="text-red-500">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Country
                          </label>
                          <div className="mt-2">
                            <select
                              id="country"
                              {...register("country", {
                                required: "country is rquired",
                              })}
                              autoComplete="country-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                            >
                              <option>India</option>
                              <option>United States</option>
                              <option>Canada</option>
                              <option>Mexico</option>
                            </select>
                          </div>

                          {errors.country && (
                            <p className="text-red-500">
                              {errors.country.message}
                            </p>
                          )}
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street-address"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              id="street"
                              {...register("street", {
                                required: "street-address is required",
                              })}
                              type="text"
                              autoComplete="street-address"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                          </div>

                          {errors.street && (
                            <p className="text-red-500">
                              {errors.street.message}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              id="city"
                              {...register("city", {
                                required: "city is required",
                              })}
                              type="text"
                              autoComplete="address-level2"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                          </div>

                          {errors.city && (
                            <p className="text-red-500">
                              {errors.city.message}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="region"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              id="State"
                              {...register("State", {
                                required: "State is required",
                              })}
                              type="text"
                              autoComplete="address-level1"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                          </div>

                          {errors.State && (
                            <p className="text-red-500">
                              {errors.State.message}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="postal-code"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            ZIP / pin code
                          </label>
                          <div className="mt-2">
                            <input
                              id="pinCode"
                              {...register("pinCode", {
                                required: "pin-code is required",
                              })}
                              type="text"
                              autoComplete="postal-code"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                          </div>
                          {errors.pinCode && (
                            <p className="text-red-500">
                              {errors.pinCode.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          type="button"
                          onClick={() => {
                            reset();
                            setEditFormIndex(-1);
                          }}
                          className="text-sm/6 font-semibold text-gray-900"
                        >
                          cancle
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          edit Address
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : null}
          </div>
          <div
            className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8"
            key={index}
          >
            <div className="border-t border-gray-200 px-4 py-0 sm:px-6">
              <div>
                <div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Saved Addresses
                  </p>
                  <div className="flex justify-between px-5 gap-x-6 py-5 border-solid border-2 border-gray-400 mb-4 mt-3">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm/6 font-bold text-gray-900">
                        {address.name}
                      </p>
                      <p className="mt-1 truncate font-bold text-xs/5 text-gray-900">
                        street: {address.street}
                      </p>
                      <p className="mt-1 truncate font-bold text-xs/5 text-gray-900">
                        country: {address.country}
                      </p>
                      <p className="mt-1 truncate font-bold text-xs/5 text-gray-900">
                        pin code: {address.pinCode}
                      </p>
                    </div>
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm/6 font-bold text-gray-900">
                        phone: {address.phone}
                      </p>
                      <p className="text-sm/6 font-bold text-gray-900">
                        city: {address.city}
                      </p>
                      <p className="text-sm/6 font-bold text-gray-900">
                        state: {address.State}
                      </p>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col font-bold sm:items-end">
                      <div className="flex mb-5">
                        <button
                          type="button"
                          className="font-medium ml-3 text-indigo-600 hover:text-indigo-500"
                          onClick={(e) => handleEditForm(index)}
                        >
                          edit
                        </button>
                      </div>
                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium ml-3 text-indigo-600 hover:text-indigo-500"
                          onClick={(e) => handleRemove(e, index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          or{" "}
          <Link to="/">
            <button
              type="button"
              // onClick={() => setOpen(false)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </Link>
        </p>
      </div>
    </>
  );
}
