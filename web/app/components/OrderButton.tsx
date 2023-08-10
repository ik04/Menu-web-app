import React, { useContext, useEffect, useState } from "react";
import AddOrder from "../../lib/AddOrder";
import { Toaster, toast } from "react-hot-toast";
import AddOrderQuantity from "@/lib/AddOrderQuantity";
import DecrementOrderQuantity from "@/lib/DecrementOrderQuantity";
import { GlobalContext } from "@/contexts/GlobalContext";
import { OrderContext } from "@/contexts/OrderContext";
import getUserPendingOrders from "@/lib/GetUserPendingOrders";

// todo: fix order bugs

export const OrderButton = (props: {
  itemUuid: string;
  orderMode: boolean;
}) => {
  const [isAdded, setIsAdded] = useState<boolean>();
  const [orderQuantity, setOrderQuantity] = useState<number | undefined>();
  const [orderUuid, setOrderUuid] = useState<string | undefined>();
  const { isAuthenticated } = useContext(GlobalContext);
  const { orders, setOrdersCount, setOrderTotalPrice } =
    useContext(OrderContext);
  const addOrderOnClick = async (itemUuid: string) => {
    if (!isAuthenticated) {
      toast.error("Please Login In");
      setTimeout(() => {
        location.href = "/login";
      }, 2000);
    } else {
      try {
        const orderResponse = await AddOrder(itemUuid);
        console.log(orderResponse);
        setIsAdded(true);
        setOrderQuantity(1);
        setOrderUuid(orderResponse.order_uuid);
        setOrdersCount((prev) => prev + 1);
      } catch (error: any) {
        console.log(error);
      }
    }
  };
  // todo: ui improvements
  const onOrderIncrement = async (orderUuid: string | undefined) => {
    try {
      const addOrderQuantityResponse = await AddOrderQuantity(orderUuid);
      setOrderQuantity(addOrderQuantityResponse.order.quantity);
      console.log(addOrderQuantityResponse.order);
      setOrderTotalPrice((prev) => prev + addOrderQuantityResponse.order.price);
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

        console.log(subOrderQuantityResponse.order);
        setIsAdded(false);
        if (!props.orderMode) {
          location.href = "/checkout";
        }
        setOrdersCount((prev) => prev - 1);
      } else {
        const subOrderQuantityResponse = await DecrementOrderQuantity(
          orderUuid
        );
        console.log(subOrderQuantityResponse.order);
        setOrderQuantity(subOrderQuantityResponse.order.quantity);
        setOrderTotalPrice(
          (prev) => prev - subOrderQuantityResponse.order.price
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        orders.forEach((order) => {
          if (order.item_uuid === props.itemUuid) {
            setIsAdded(true);
            setOrderQuantity(order.quantity);
            setOrderUuid(order.order_uuid);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserOrders();
  }, [orders]);

  return (
    <>
      <Toaster />
      {isAdded ? (
        <div
          key={props.itemUuid}
          className={`${
            props.orderMode
              ? "text-white text-xl rounded-full bg-azure p-3 w-[300px] my-2 flex justify-between"
              : "text-white text-xl bg-azure p-2 flex justify-between w-[100px]"
          }`}
        >
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
          key={props.itemUuid}
          onClick={() => addOrderOnClick(props.itemUuid)}
          className={`${
            props.orderMode
              ? "text-white rounded-full bg-azure p-3 w-[300px] my-2"
              : "hidden"
          }`}
        >
          Add to Cart
        </button>
      )}
    </>
  );
};
