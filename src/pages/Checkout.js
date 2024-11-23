import React from "react";
import { Link } from "react-router-dom";

const products = [
    {
        id: 1,
        name: "Throwback Hip Bag",
        href: "#",
        color: "Salmon",
        price: "$90.00",
        quantity: 1,
        imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
        imageAlt:
            "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
    },
    {
        id: 2,
        name: "Medium Stuff Satchel",
        href: "#",
        color: "Blue",
        price: "$32.00",
        quantity: 1,
        imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
        imageAlt:
            "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
        id: 2,
        name: "Medium Stuff Satchel",
        href: "#",
        color: "Blue",
        price: "$32.00",
        quantity: 1,
        imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
        imageAlt:
            "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
        id: 2,
        name: "Medium Stuff Satchel",
        href: "#",
        color: "Blue",
        price: "$32.00",
        quantity: 1,
        imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
        imageAlt:
            "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
        id: 2,
        name: "Medium Stuff Satchel",
        href: "#",
        color: "Blue",
        price: "$32.00",
        quantity: 1,
        imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
        imageAlt:
            "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
        id: 2,
        name: "Medium Stuff Satchel",
        href: "#",
        color: "Blue",
        price: "$32.00",
        quantity: 1,
        imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
        imageAlt:
            "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
        id: 2,
        name: "Medium Stuff Satchel",
        href: "#",
        color: "Blue",
        price: "$32.00",
        quantity: 1,
        imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
        imageAlt:
            "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
        id: 2,
        name: "Medium Stuff Satchel",
        href: "#",
        color: "Blue",
        price: "$32.00",
        quantity: 1,
        imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
        imageAlt:
            "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
        id: 2,
        name: "Medium Stuff Satchel",
        href: "#",
        color: "Blue",
        price: "$32.00",
        quantity: 1,
        imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
        imageAlt:
            "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
        id: 2,
        name: "Medium Stuff Satchel",
        href: "#",
        color: "Blue",
        price: "$32.00",
        quantity: 1,
        imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
        imageAlt:
            "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
        id: 2,
        name: "Medium Stuff Satchel",
        href: "#",
        color: "Blue",
        price: "$32.00",
        quantity: 1,
        imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
        imageAlt:
            "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
        id: 2,
        name: "Medium Stuff Satchel",
        href: "#",
        color: "Blue",
        price: "$32.00",
        quantity: 1,
        imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
        imageAlt:
            "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
        id: 2,
        name: "Medium Stuff Satchel",
        href: "#",
        color: "Blue",
        price: "$32.00",
        quantity: 1,
        imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
        imageAlt:
            "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    // More products...
];

const addresses = [
    {
        name: "john week",
        street: "11th main",
        city: "Dehli",
        pinCode: 314025,
        state: "Dehli",
        phone: 6452483476,
    },
    {
        name: "Rakesh",
        street: "bus stand",
        city: "Ahemedabad",
        pinCode: 445474,
        state: "Gujrat",
        phone: 3749505246,
    },
];

export default function Checkout() {
    return (
        <>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <form className="bg-gray-200 px-5 mt-12 py-7">
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className=" text-4xl  font-semibold text-gray-900 sticky top-0">
                                        Personal Information
                                    </h2>
                                    <p className="text-1xl mt-1 text-gray-600">
                                        Use a permanent address where you can receive mail.
                                    </p>
                                    <div style={{
                                        maxHeight: '600px', // Set your desired max height
                                        overflowY: 'auto', // Enable vertical scrolling
                                        overflowX: 'hidden', // Prevent horizontal scrolling
                                        // scrollbarWidth: 'none', // For Firefox (hides scrollbar)
                                        // msOverflowStyle: 'none', // For Internet Explorer and Edge
                                    }}>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="first-name"
                                                className="block text-sm/6 font-medium text-gray-900"
                                            >
                                                First name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="first-name"
                                                    name="first-name"
                                                    type="text"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="last-name"
                                                className="block text-sm/6 font-medium text-gray-900"
                                            >
                                                Last name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="last-name"
                                                    name="last-name"
                                                    type="text"
                                                    autoComplete="family-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm/6 font-medium text-gray-900"
                                            >
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
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
                                                    name="country"
                                                    autoComplete="country-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                                                >
                                                    <option>United States</option>
                                                    <option>Canada</option>
                                                    <option>Mexico</option>
                                                </select>
                                            </div>
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
                                                    id="street-address"
                                                    name="street-address"
                                                    type="text"
                                                    autoComplete="street-address"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
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
                                                    name="city"
                                                    type="text"
                                                    autoComplete="address-level2"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
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
                                                    id="region"
                                                    name="region"
                                                    type="text"
                                                    autoComplete="address-level1"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor="postal-code"
                                                className="block text-sm/6 font-medium text-gray-900"
                                            >
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="postal-code"
                                                    name="postal-code"
                                                    type="text"
                                                    autoComplete="postal-code"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
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
                                            {addresses.map((address) => (
                                                <li
                                                    key={address.city}
                                                    className="flex justify-between px-5 gap-x-6 py-5 border-solid border-2 border-gray-400 mb-4 mt-3"
                                                >
                                                    <div className="flex min-w-0 gap-x-4">
                                                        <input
                                                            id="cash"
                                                            name="payments"
                                                            type="radio"
                                                            className="size-4 border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-sm/6 font-semibold text-gray-900">
                                                                {address.name}
                                                            </p>
                                                            <p className="mt-1 truncate text-xs/5 text-gray-900">
                                                                street:{address.street}
                                                            </p>
                                                            <p className="mt-1 truncate text-xs/5 text-gray-900">
                                                                pin code: {address.pinCode}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                        <p className="text-sm/6 text-gray-900">
                                                            phone: {address.phone}
                                                        </p>
                                                        <p className="text-sm/6 text-gray-900">
                                                            city: {address.city}
                                                        </p>
                                                        <p className="text-sm/6 text-gray-900">
                                                            state: {address.state}
                                                        </p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-10 space-y-10">
                                        <fieldset>
                                            <legend className="text-sm/6 font-semibold text-gray-900">
                                                Payment Methods
                                            </legend>
                                            <p className="mt-1 text-sm/6 text-gray-600">Chose one</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="cash"
                                                        name="payments"
                                                        type="radio"
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
                                    <ul role="list" className="-my-6 divide-y px-5 divide-gray-200"
                                        style={{
                                        maxHeight: '500px', // Set your desired max height
                                        overflowY: 'auto', // Enable vertical scrolling
                                        overflowX: 'hidden', // Prevent horizontal scrolling
                                        scrollbarWidth: 'none', // For Firefox (hides scrollbar)
                                        msOverflowStyle: 'none', // For Internet Explorer and Edge
                                    }}>
                                        {products.map((product) => (
                                            <li key={product.id} className="flex py-6">
                                                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        alt={product.imageAlt}
                                                        src={product.imageSrc}
                                                        className="size-full object-cover"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={product.href}>{product.name}</a>
                                                            </h3>
                                                            <p className="ml-4">{product.price}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {product.color}
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
                                                            <select>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                            </select>
                                                        </div>

                                                        <div className="flex">
                                                            <button
                                                                type="button"
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
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
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>$262.00</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                    Shipping and taxes calculated at checkout.
                                </p>
                                <div className="mt-6">
                                    <a
                                        href="#"
                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        Pay and Order
                                    </a>
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
        </>
    );
}
