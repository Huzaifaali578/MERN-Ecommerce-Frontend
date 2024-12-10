import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AllOrdersSelector,
  fetchAllOrdersAsync,
  totalOrdersSelector,
  updateOrderAsync,
} from "../../Orders/orderSlice";
import { ITEMS_PER_PAGE } from "../../../app/constans";
import {
  EyeIcon,
  PencilIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../commen/Pagination";

export default function AdminOrder() {
  const dispatch = useDispatch();
  const AllOrders = useSelector(AllOrdersSelector);
  console.log(AllOrders)
  const totalOrders = useSelector(totalOrdersSelector);
  const [page, setPage] = useState(1);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  function handleSort(option) {
    const newSort = { _sort: option.sort, _order: option.order };
    setSort(newSort);
    console.log("Updated Sort:", newSort);
  }

  const handleShow = () => {
    console.log("show");
  };

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    if (window.confirm("Are you sure you want to update the order status?")) {
      dispatch(updateOrderAsync(updatedOrder)).catch((error) => {
        console.error("Failed to update order status:", error);
      });
    }
    setEditableOrderId(-1);
  };

  const handleColor = (status) => {
    const statusColors = {
      pending: "bg-purple-200 text-purple-600",
      dispatched: "bg-yellow-200 text-yellow-600",
      delivered: "bg-green-200 text-green-600",
      cancelled: "bg-red-200 text-red-600",
    };

    // Return the corresponding class or a default class
    return statusColors[status] || "bg-purple-200 text-purple-600";
  };

  function handlePage() {
    setPage(page);
  }

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return (
    <>
      <div className="overflow-x-auto ">
        <div className="bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className=" w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={() =>
                        handleSort({
                          sort: "id",
                          order: sort?._order === "asc ? desc : asc",
                        })
                      }
                    >
                      Order Number {"  "}
                      {sort._sort === "id" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline" />
                        ))}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th
                      className="py-3 px-6 text-center"
                      onClick={() =>
                        handleSort({
                          sort: "totalAmount",
                          order: sort?._order === "asc ? desc : asc",
                        })
                      }
                    >
                      {" "}
                      Total Amount {"  "}
                      {sort._sort === "totalAmount" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline" />
                        ))}
                    </th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {AllOrders?.map((order) => (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100"
                      key={order.id}
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.items.map((item) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.thumbnail}
                              />
                            </div>
                            <span>
                              {item.title} - #{item.quantity}- ${item.price}{" "}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          {Math.round(order.totalAmount)}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="items-center">
                          <div>
                            <strong>{order.addressSelected.name}</strong>
                          </div>
                          <div>{order.addressSelected.phone}</div>
                          <div>{order.addressSelected.email}</div>
                          <div>{order.addressSelected.street}</div>
                          <div>
                            {order.addressSelected.city}-{" "}
                            {order.addressSelected.State}
                          </div>
                          <div>
                            {order.addressSelected.pinCode} -{" "}
                            {order.addressSelected.country}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {editableOrderId === order.id ? (
                          <select
                            defaultValue={order.status}
                            onChange={(e) => handleUpdate(e, order)}
                          >
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispached</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${handleColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 cursor-pointer mr-5 transform hover:text-purple-500 hover:scale-110">
                            <EyeIcon
                              className="w-8 h-8"
                              onClick={(e) => handleShow(order)}
                            />
                          </div>
                          <div className="w-4 mr-4 cursor-pointer transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon
                              className="w-8 h-8"
                              onClick={(e) => handleEdit(order)}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        handlePage={handlePage}
        page={page}
        setPage={setPage}
        totalItems={totalOrders}
      />
    </>
  );
}
