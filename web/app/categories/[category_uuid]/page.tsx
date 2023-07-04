import React from "react";
import getCategoryItems from "@/lib/GetCategoryItems";
import { CategoryItemsResponse, CategoryProps } from "@/types/types";
import { AxiosResponse } from "axios";

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
      {categoryItems.items.map((item) => (
        <>
          <div className="flex space-x-2">
            <div>{item.name}</div>
            <div>{item.price}</div>
          </div>
        </>
      ))}
    </div>
  );
}
