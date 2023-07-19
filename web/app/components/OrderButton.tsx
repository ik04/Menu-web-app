import React, { useEffect, useState } from "react";
import AddOrder from "../../lib/AddOrder";
import { Toaster } from "react-hot-toast";
import AddOrderQuantity from "@/lib/AddOrderQuantity";
import DecrementOrderQuantity from "@/lib/DecrementOrderQuantity";

// todo: fix order bugs

export const OrderButton = (props: {
  itemUuid: string;
  quantity?: number;
  isset: boolean;
  orderUuid?: string;
}) => {
  const [isAdded, setIsAdded] = useState(props.isset);
  const [orderQuantity, setOrderQuantity] = useState(props.quantity);
  const [orderUuid, setOrderUuid] = useState(props.orderUuid);
  const addOrderOnClick = async (itemUuid: string) => {
    try {
      const orderResponse = await AddOrder(itemUuid);
      console.log(orderResponse);
      setIsAdded(true);
      setOrderQuantity(1);
      setOrderUuid(orderResponse.order_uuid);
    } catch (error: any) {
      console.log(error);
    }
  };
  // todo: ui improvements
  const onOrderIncrement = async (orderUuid: string | undefined) => {
    try {
      const addOrderQuantityResponse = await AddOrderQuantity(orderUuid);
      console.log(addOrderQuantityResponse.order);
      setOrderQuantity(addOrderQuantityResponse.order.quantity);
    } catch (error) {
      console.log(error);
    }
  };
  const onOrderDecrement = async (orderUuid: string | undefined) => {
    try {
      if (orderQuantity === 1) {
        const subOrderQuantityResponse = await DecrementOrderQuantity(
          orderUuid
        );
        setIsAdded(false);
      } else {
        const subOrderQuantityResponse = await DecrementOrderQuantity(
          orderUuid
        );
        console.log(subOrderQuantityResponse.order);
        setOrderQuantity(subOrderQuantityResponse.order.quantity);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const savedOrderQuantity = localStorage.getItem(
      `orderQuantity-${props.itemUuid}`
    );
    if (savedOrderQuantity) {
      setOrderQuantity(Number(savedOrderQuantity));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      `orderQuantity-${props.itemUuid}`,
      String(orderQuantity)
    );
  }, [orderQuantity]);

  return (
    <>
      {isAdded ? (
        <div className="border border-white text-white text-xl rounded-full bg-hotorange p-3 w-[300px] my-2 flex justify-between">
          <button className="minus" onClick={() => onOrderDecrement(orderUuid)}>
            -
          </button>
          <div className="quantity">{orderQuantity}</div>
          <button className="plus" onClick={() => onOrderIncrement(orderUuid)}>
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => addOrderOnClick(props.itemUuid)}
          className="border border-white text-white rounded-full bg-hotorange p-3 w-[300px] my-2"
        >
          Add to Cart
        </button>
      )}
    </>
  );
};
// ! fix all errors
