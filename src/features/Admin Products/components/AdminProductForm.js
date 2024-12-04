import React, { useEffect, useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  brandSelector,
  categorySelector,
  createProductAsync,
  fetchProductByIdAsync,
  productDetailByIdSelector,
  resetProductDetailById,
  updateProductAsync,
} from "../../product-list/ProductSlice";
import { useForm } from "react-hook-form";
import { Link, Navigate, useParams } from "react-router-dom";

export default function AdminProductForm() {
  const categories = useSelector(categorySelector);
  const brands = useSelector(brandSelector);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const selectedProduct = useSelector(productDetailByIdSelector);
  const [formSubmited, setFormSubmited] = useState(false)

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(resetProductDetailById());
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    console.log(selectedProduct);
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stock", selectedProduct.stock);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("price", selectedProduct.price);
    }
  }, [dispatch, selectedProduct, setValue]);

  function handleDelete() {
    const product = { ...selectedProduct }
    product.deleted = true; 
    dispatch(updateProductAsync(product));
  }

  return (
    <>
      {formSubmited && <Navigate to="/admin"></Navigate>}
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          const product = { ...data };
          product.images = [
            product.image1,
            product.image2,
            product.image3,
            product.thumbnail,
          ];
          delete product["image1"];
          delete product["image2"];
          delete product["image3"];
          product.rating = +selectedProduct.rating || 0;
          product.price = +product.price;
          product.discountPercentage = +product.discountPercentage;
          product.stock = +product.stock;
          console.log(product);
          if (selectedProduct.id === params.id) {
            product.id = params.id;
            dispatch(updateProductAsync(product));
          } else {
            dispatch(createProductAsync(product));
          }
          setFormSubmited(true)
        })}
      >
        <div className="space-y-12 bg-gray-100 p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Add Product
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    {...register("title", {
                      required: " title of product is require",
                    })}
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: " description of product is require",
                    })}
                    rows={3}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Write a few sentences about product.
                </p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="cotegory"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  category
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="category"
                    {...register("category", {
                      required: " category of product is require",
                    })}
                    autoComplete="country-name"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option value="">--chose category--</option>
                    {categories.map((category) => (
                      <option value={category.value}>{category.label}</option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="brand"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Brands
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="brand"
                    {...register("brand", {
                      required: " brand of product is require",
                    })}
                    autoComplete="country-name"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option value="">--chose brand--</option>
                    {brands.map((brand) => (
                      <option value={brand.value}>{brand.label}</option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    {...register("price", {
                      required: " price of product is require",
                      min: 1,
                      max: 10000,
                    })}
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  discount Percentage
                </label>
                <div className="mt-2">
                  <input
                    id="discountPercentage"
                    {...register("discountPercentage", {
                      required: " discountPercentage of product is require",
                      min: 0,
                      max: 100,
                    })}
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    id="stock"
                    {...register("stock", {
                      required: " stock of product is require",
                      min: 0,
                    })}
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  thumbnail
                </label>
                <div className="mt-2">
                  <input
                    id="thumbnail"
                    {...register("thumbnail", {
                      required: " thumbnail of product is require",
                    })}
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="image1"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  images1
                </label>
                <div className="mt-2">
                  <input
                    id="image1"
                    {...register("image1", {
                      required: " image1 is require",
                    })}
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="image2"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  images2
                </label>
                <div className="mt-2">
                  <input
                    id="image2"
                    {...register("image2")}
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="image3"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  images3
                </label>
                <div className="mt-2">
                  <input
                    id="image3"
                    {...register("image3")}
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            to="/admin"
            type="button"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Cancel
          </Link>
          <button
            onClick={handleDelete()}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rde-600"
          >
            DELETE
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
