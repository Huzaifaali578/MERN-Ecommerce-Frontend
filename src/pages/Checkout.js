import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  cartItemCheckSelector,
  cartSelector,
  removeFromCartAsync,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  createOrderAsync,
  currentOrderR,
  currentOrderSelector,
} from "../features/Orders/orderSlice";
import {
  updateUserAddressAsync,
  userInfoSelector,
} from "../features/user/userSlice";
import { discountPrice } from "../app/constans";

export default function Checkout() {
  const dispatch = useDispatch();
  // const [open, setOpen] = useState(true);
  const items = useSelector(cartSelector);
  const cartItemCheck = useSelector(cartItemCheckSelector);
  const currentOrder = useSelector(currentOrderSelector);
  const user = useSelector(userInfoSelector);
  const totalAmount = items.reduce(
    (amount, item) => discountPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [addressSelected, setAddressSelected] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  function handleUpadteQty(e, item) {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  }
  function handleRemove(e, itemId) {
    dispatch(removeFromCartAsync(itemId));
  }
  function handleAddress(e) {
    console.log("User addresses:", user?.addresses[e.target.value]);
    console.log("Selected index:", e.target.value);
    setAddressSelected(user?.addresses[e.target.value]);
  }
  function handlePayment(e) {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  }

  function handleOrder() {
    const order = {
      items,
      user: user?.id,
      totalAmount,
      totalItems,
      paymentMethod,
      addressSelected,
      status: "pending", // other status can be delivered and received
    };
    if (addressSelected && paymentMethod) {
      dispatch(createOrderAsync(order));
      // dispatch(currentOrderR(order));

      // console.log(order);
    } else {
      // TODO: need to redirect from here to new page of order success
      alert("Enter Address and payment method");
    }
    // TODO: redirect to order-succes page
    // TODO: clear cart after order
    //TODO: on server change the stock number of items
  }
  // console.log(user))
  {
    !user && <p>Loading.....</p>;
  }
  console.log(currentOrder);
  return (
    <>
      <div>
        {!items.length && cartItemCheck && (
          <Navigate to="/" replace={true}></Navigate>
        )}
        {currentOrder && currentOrder?.paymentMethod === "cash" && (
          <Navigate to={`/order-succes/${currentOrder.id}`} replace={true} />
        )}

        {currentOrder && currentOrder?.paymentMethod === "card" && (
          <Navigate to={`/stripe-checkout/`} replace={true}></Navigate>
        )}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <form
                className="bg-gray-200 px-5 mt-12 py-7"
                onSubmit={handleSubmit((data) => {
                  dispatch(
                    updateUserAddressAsync({
                      ...user,
                      addresses: user.addresses
                        ? [...user.addresses, data]
                        : [data],
                    })
                  );

                  reset();
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
                            htmlFor="first-name"
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
                          className="text-sm/6 font-semibold text-gray-900"
                        >
                          Reset
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          add Address
                        </button>
                      </div>

                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">
                          Address
                        </h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                          Chose from Existing Address
                        </p>
                        <div>
                          <ul role="list">
                            {user?.addresses?.map((address, index) => (
                              <li
                                key={address.id || index}
                                className="flex justify-between px-5 gap-x-6 py-5 border-solid border-2 border-gray-400 mb-4 mt-3"
                              >
                                <div className="flex min-w-0 gap-x-4">
                                  <input
                                    id={`address-${index}`}
                                    name="address"
                                    onClick={(e) => handleAddress(e)}
                                    value={index}
                                    type="radio"
                                    className="size-4 border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-600"
                                  />
                                  <label htmlFor={`address-${index}`} className="cursor-pointer min-w-0 flex-auto">
                                    <p className="text-sm/6 font-bold text-gray-900">{address.name}</p>
                                    <p className="mt-1 truncate font-bold text-xs/5 text-gray-900">
                                      street: {address.street}
                                    </p>
                                    <p className="mt-1 truncate font-bold text-xs/5 text-gray-900">
                                      country: {address.country}
                                    </p>
                                    <p className="mt-1 truncate font-bold text-xs/5 text-gray-900">
                                      pin code: {address.pinCode}
                                    </p>
                                  </label>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col font-bold sm:items-end">
                                  <p className="text-sm/6 text-gray-900">phone: {address.phone}</p>
                                  <p className="text-sm/6 font-bold text-gray-900">city: {address.city}</p>
                                  <p className="text-sm/6 font-bold text-gray-900">state: {address.State}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>;
                        <div className="mt-10 space-y-10">
                          <fieldset>
                            <legend className="text-sm/6 font-semibold text-gray-900">
                              Payment Methods
                            </legend>
                            <p className="mt-1 text-sm/6 text-gray-600">
                              Chose one
                            </p>
                            <div className="mt-6 space-y-6">
                              <div className="flex items-center gap-x-3">
                                <input
                                  id="cash"
                                  name="payments"
                                  type="radio"
                                  onClick={(e) => handlePayment(e)}
                                  value={"cash"}
                                  checked={paymentMethod === "cash"}
                                  className="size-4 border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-600"
                                />
                                <label
                                  htmlFor="cash"
                                  className="block text-sm/6 font-medium text-gray-900"
                                >
                                  Cash Payment
                                </label>
                              </div>
                              <div className="flex items-center gap-x-3">
                                <input
                                  id="card"
                                  name="payments"
                                  type="radio"
                                  onClick={(e) => handlePayment(e)}
                                  value={"card"}
                                  checked={paymentMethod === "card"}
                                  className="size-4 border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-600"
                                />
                                <label
                                  htmlFor="card"
                                  className="block text-sm/6 font-medium text-gray-900"
                                >
                                  Card Payment
                                </label>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="lg:col-span-2">
              <div className="mx-auto max-w-2xl px-4 scroll mt-12  sm:px-6 sm:py-0 lg:max-w-7xl lg:px-0 bg-gray-200 sticky top-0">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-7">
                  <div className="flow-root">
                    <h1 className="text-4xl mb-10 font-bold tracking-tight text-gray-900 sticky top-0 px-5">
                      Shopping cart
                    </h1>
                    <ul
                      role="list"
                      className="-my-6 divide-y px-5 divide-gray-200"
                      style={{
                        maxHeight: "500px", // Set your desired max height
                        overflowY: "auto", // Enable vertical scrolling
                        overflowX: "hidden", // Prevent horizontal scrolling
                        scrollbarWidth: "none", // For Firefox (hides scrollbar)
                        msOverflowStyle: "none", // For Internet Explorer and Edge
                      }}
                    >
                      {items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              alt={item.product.title}
                              src={item.product.thumbnail}
                              className="size-full object-cover"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={item.product.id}>
                                    {item.product.title}
                                  </a>
                                </h3>
                                <p className="ml-4">
                                  $ {discountPrice(item.product)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm/6 font-medium text-gray-900"
                                >
                                  Qty
                                </label>
                                <select
                                  onChange={(e) => handleUpadteQty(e, item)}
                                  value={item.quantity}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                </select>
                              </div>

                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium ml-10 text-indigo-600 hover:text-indigo-500"
                                  onClick={(e) => handleRemove(e, item.id)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between my-5 text-base font-bold text-gray-900">
                    <p>Subtotal</p>
                    <p>${Math.ceil(totalAmount)}</p>
                  </div>
                  <div className="flex justify-between my-5 text-base font-bold-+ text-gray-900">
                    <p>Total Item in Cart</p>
                    <p>{totalItems} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <div
                      onClick={() => handleOrder()}
                      className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Pay and Order
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <Link to="/">
                        <button
                          type="button"
                          onClick={() => false}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
