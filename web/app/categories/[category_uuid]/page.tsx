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

  return (
    <div>
      <div>{categoryItems.category_name}</div>
      {categoryItems.items.map((item) => {
        console.log(item.image);
        return (
          <>
            <div className="flex space-x-2">
              <Image
                alt=""
                src={`http://localhost:8000${item.image}`}
                width={300}
                height={700}
              />
              <div>{item.name}</div>
              <div>{item.price}</div>
            </div>
          </>
        );
      })}
    </div>
  );
}
