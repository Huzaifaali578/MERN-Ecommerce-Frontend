import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom'
import { checkUserAsync, errorSelector, loggedInUserSelector } from '../authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Heroicons

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(errorSelector)
  const user = useSelector(loggedInUserSelector)
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            action="#"
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              dispatch(checkUserAsync({ email: data.email, password: data.password }));
              // console.log(data);
            })}
          >
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "Email is not Valid",
                    },
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is Required",
                  })}
                  type={showPassword ? "text" : "password"} // Toggle type dynamically
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>

              {error && (<p className="text-red-500">{error.message}</p>)}

            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
