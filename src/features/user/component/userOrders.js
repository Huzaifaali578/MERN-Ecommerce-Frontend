import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { myOrderSelector, userInfoSelector, userOrderAsync } from '../userSlice';
import { Link } from 'react-router-dom';



export default function UserOrders() {
  const user = useSelector(userInfoSelector);
  console.log("myorder", user)
  const myOrderDetails = useSelector(myOrderSelector)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOrderAsync(user.id))
  }, [dispatch, user])
  console.log("myOrderDetail", myOrderDetails)
  // console.log("user", user.id)

  return (
    <>
      {myOrderDetails.map((order) => (
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <div className="flow-root">
              <h1 className="text-4xl mb-10 font-bold tracking-tight text-gray-900">
                Order Number # {order.id}
              </h1>
              <h3 className="text-2xl mb-10 font-bold tracking-tight text-red-900">
                status: {order.status}
              </h3>
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((item) => (
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
                          <p className="ml-4">{item.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label htmlFor="quantity" className="inline mr-5 text-sm/6 font-medium text-gray-900">
                            Qty : {item.quantity}
                          </label>
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
              <p>${Math.ceil(order.totalAmount)}</p>
            </div>
            <div className="flex justify-between my-5 text-base font-bold text-gray-900">
              <p>Total Item</p>
              <p>{order.totalItems} items</p>
            </div>
            <div>
            <div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping Address
              </p>
              <div
                className="flex justify-between px-5 gap-x-6 py-5 border-solid border-2 border-gray-400 mb-4 mt-3"
              >
                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-bold text-gray-900">
                    {order.addressSelected.name}
                  </p>
                  <p className="mt-1 truncate font-bold text-xs/5 text-gray-900">
                    street: {order.addressSelected.street}
                  </p>
                  <p className="mt-1 truncate font-bold text-xs/5 text-gray-900">
                    country: {order.addressSelected.country}
                  </p>
                  <p className="mt-1 truncate font-bold text-xs/5 text-gray-900">
                    pin code: {order.addressSelected.pinCode}
                  </p>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col font-bold sm:items-end">
                <p className="text-sm/6 text-gray-900">
                  phone: {order.addressSelected.phone}
                </p>
                <p className="text-sm/6 font-bold text-gray-900">
                  city: {order.addressSelected.city}
                </p>
                <p className="text-sm/6 font-bold text-gray-900">
                  state: {order.addressSelected.State}
                </p>
              </div>
              </div>
              
            </div>
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
        </div >
      ))
}
    </>
  );
}
