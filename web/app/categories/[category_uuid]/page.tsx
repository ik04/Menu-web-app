import React, { useEffect, useState } from "react";
import getCategoryItems from "@/lib/GetCategoryItems";
import { CategoryItemsResponse, CategoryProps } from "@/types/types";
import { AxiosResponse } from "axios";
import Image from "next/image";
import AddOrder from "@/lib/AddOrder";

export default async function page({
  params: { category_uuid },
}: CategoryProps) {
  const formdata = {
    category_uuid: category_uuid,
  };
  const categoryItems: CategoryItemsResponse = await getCategoryItems(formdata);

  // todo: make this responsive
  // todo: make cards cooler with framer and glassmorphism

  // const addOrderOnClick = (itemUuid: string) => {
  //   const ordeResponse = AddOrder(itemUuid);
  //   setIsAdded(true);
  // };

  return (
    <div className="h-screen">
      <h2 className="text-4xl font-mono font-bold text-hotorange text-center translate-y-24">
        {categoryItems?.category_name.toUpperCase()}
      </h2>
      <div className="flex justify-center items-center">
        <div className="w-[1500px] flex justify-around flex-wrap mt-28 space-x-5">
          {categoryItems?.items.map((item, index) => {
            console.log(item.image);
            return (
              <div className="m-4 bg-slate-400 rounded-xl p-4">
                <div className="flex flex-col space-y-2">
                  <Image
                    alt={`${item.name}`}
                    src={`http://localhost:8000${item.image}`}
                    width={300}
                    height={300}
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

// todo: add tailwind extention and better comments and rename prolly
// ! how do i persisyt the quantity on refresh, solve
// use an if statement and orderContext
