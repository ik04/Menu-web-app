"use client";
import React, { useEffect, useState } from "react";
import Nabvar from "./components/Nabvar";
import GetCategories from "@/lib/GetCategories";
import { Category } from "@/types/types";
import Link from "next/link";

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const callEndpoint = async () => {
    const resp = await GetCategories();
    const categories = resp.data.categories;
    console.log(categories);
    setCategories(categories);
  };
  useEffect(() => {
    callEndpoint();
  }, []);

  return (
    <div className="bg-cream text-black">
      <Nabvar />

      <div className="h-screen overflow-x-hidden">
        {/* Landing image */}
        <div className="w-screen bg-red-300 h-2/4 flex justify-center items-center">
          <h1 className="text-7xl text-hotorange">
            Menu<span className="text-white">Sphere</span>
          </h1>
        </div>

        {/* Categories */}
        <div className="category-section flex flex-col items-center w-full justify-center mt-10">
          <h2 className="text-4xl font-mono">Categories</h2>
          <div className="flex justify-center flex-wrap w-[1000px]">
            {categories.map((category) => (
              <Link
                href={`/categories/${category.category_uuid}`}
                className="bg-gray-300 p-5 rounded-xl w-[300px] m-4"
                key={category.category_uuid}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// todo : add meta data to each page (dynamic using ssr?)
