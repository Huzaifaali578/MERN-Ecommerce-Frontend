import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { cartSelector, removeFromCartAsync, updateCartAsync } from "./cartSlice";
import { discountPrice } from "../../app/constans";


export default function Cart() {
  const dispatch = useDispatch()
  // const [open, setOpen] = useState(true);
  const items = useSelector(cartSelector)
  const totalAmount = items.reduce((amount, item) => discountPrice(item) * item.quantity + amount, 0)
  const totalItems = items.reduce((total, item) => item.quantity + total, 0)
  function handleUpadteQty(e, item) {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }))
  }
  function handleRemove(e, itemId) {
    dispatch(removeFromCartAsync(itemId))
  }

  return (
    <>
      {/* {!items.length && <Navigate to="/" replace={true}></Navigate>} */}
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <div className="flow-root">
            <h1 className="text-4xl mb-10 font-bold tracking-tight text-gray-900">
              Shopping cart
            </h1>
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={item.title}
                      src={item.thumbnail}
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="ml-4 flex  flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.href}>{item.title}</a>
                        </h3>
                        <p className="ml-4">$ {discountPrice(item)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label htmlFor="quantity"className="inline mr-5 text-sm/6 font-medium text-gray-900">
                          Qty
                        </label>
                        <select onChange={(e) => handleUpadteQty(e, item)} value={item.quantity}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium ml-3 text-indigo-600 hover:text-indigo-500"
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
          <div className="flex justify-between my-5 text-base font-bold text-gray-900">
            <p>Total Item in Cart</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
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
        </div>
      </div>
    </>
  );
}
