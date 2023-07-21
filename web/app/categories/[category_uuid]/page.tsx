"use client";
import React, { useContext, useEffect, useState } from "react";
import getCategoryItems from "@/lib/GetCategoryItems";
import { CategoryItemsResponse, CategoryProps } from "@/types/types";
import { AxiosResponse } from "axios";
import Image from "next/image";
import AddOrder from "@/lib/AddOrder";
import { OrderButton } from "@/app/components/OrderButton";
import { OrderContext } from "@/contexts/OrderContext";

export default function page({ params: { category_uuid } }: CategoryProps) {
  const { orders, setOrders } = useContext(OrderContext);
  const [categoryItems, setCategoryItems] = useState<CategoryItemsResponse>();
  const formdata = {
    category_uuid: category_uuid,
  };

  // todo: make this responsive
  // todo: make cards cooler with framer and glassmorphisma

  useEffect(() => {
    const fetchCategoryItems = async () => {
      const response = await getCategoryItems(formdata);
      setCategoryItems(response);
    };
    fetchCategoryItems();
  }, [category_uuid, orders]);

  console.log(orders);

  return (
    <div className="h-screen">
      <h2 className="text-4xl font-mono font-bold text-hotorange text-center translate-y-24">
        {categoryItems?.category_name.toUpperCase()}
      </h2>
      <div className="flex justify-center items-center">
        <div className="w-[1500px] flex justify-around flex-wrap mt-28 space-x-5">
          {categoryItems?.items.map((item, index) => {
            const order = orders.find(
              (order) => order.item_uuid === item.item_uuid
            );
            console.log(item.image);
            return (
              <div
                key={item.item_uuid}
                className="m-4 bg-slate-400 rounded-xl p-4"
              >
                <div className="flex flex-col space-y-2">
                  <Image
                    alt={`${item.name}`}
                    src={`http://localhost:8000${item.image}`}
                    width={300}
                    height={300}
                  />
                  <div className="text-cream">{item.name}</div>
                  <div className="text-azure/70">{item.price} Rs</div>

                  {order ? (
                    <OrderButton
                      isset={true}
                      quantity={order.quantity}
                      itemUuid={item.item_uuid}
                      orderUuid={order.order_uuid}
                    />
                  ) : (
                    <OrderButton isset={false} itemUuid={item.item_uuid} />
                  )}
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
