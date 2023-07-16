import React from "react";
import getCategoryItems from "@/lib/GetCategoryItems";
import { CategoryItemsResponse, CategoryProps } from "@/types/types";
import { AxiosResponse } from "axios";
import Image from "next/image";

export default async function page({
  params: { category_uuid },
}: CategoryProps) {
  const formdata = {
    category_uuid: category_uuid,
  };

  const categoryItems: CategoryItemsResponse = await getCategoryItems(formdata);
  // todo: make this responsive
  // todo: make cards cooler with framer and glassmorphism

  return (
    <div className="h-screen">
      <h2 className="text-4xl font-mono font-bold text-hotorange text-center translate-y-24">
        {categoryItems.category_name.toUpperCase()}
      </h2>
      <div className="flex justify-center items-center">
        <div className="w-[1500px] flex justify-around flex-wrap mt-28 space-x-5">
          {categoryItems.items.map((item, index) => {
            console.log(item.image);
            return (
              <div className="m-4 bg-hotorange rounded-xl p-4">
                <div className="flex flex-col space-y-2">
                  <Image
                    alt={`${item.name}`}
                    src={`http://localhost:8000${item.image}`}
                    width={300}
                    height={700}
                  />
                  <div className="text-cream">{item.name}</div>
                  <div className="text-azure/70">{item.price} Rs</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
