import GetCategories from "@/lib/GetCategories";
import { Category, CategoryResponse } from "@/types/types";
import Link from "next/link";

export default async function Page() {
  const categoryResponse: CategoryResponse | undefined = await GetCategories();
  const categories = categoryResponse?.categories;
  console.log(categories);

  return (
    <div className="bg-cream text-black">
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
            {categories?.map((category) => (
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
// todo : get a cream gradient for the pages
