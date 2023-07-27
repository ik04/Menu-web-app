"use client";
import loginUser from "@/lib/LoginUser";
import Link from "next/link";
import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formdata = {
      email: email,
      password: password,
    };
    try {
      const resp = await loginUser(formdata);
      console.log(resp);
      location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <>
        <section className="bg-white">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen md:scale-100 lg:py-0">
            <Link
              href="/"
              className="flex items-center mb-6 text-2xl font-semibold"
            >
              <img className="w-8 h-8 mr-2" src="/food.png" alt="logo" />
              <h1 className="text-azure">
                Menu<span className="text-hotorange">Sphere</span>
              </h1>
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-hotorange md:text-2xl dark:text-white">
                  Login to your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@domain.com"
                    />
                  </div>
                  <div className="">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {/* <button>
                    <img src="/show.png" alt="Show" />
                  </button> */}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-black hover:text-white bg-dalyellow hover:bg-azure duration-150 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Login
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Haven't registered?{" "}
                    <Link
                      href="/register"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Register here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
}
