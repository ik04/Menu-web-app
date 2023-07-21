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
  quantity?: number;
  isset: boolean;
  orderUuid?: string;
}) => {
  const [isAdded, setIsAdded] = useState(props.isset);
  const [orderQuantity, setOrderQuantity] = useState(props.quantity);
  const [orderUuid, setOrderUuid] = useState(props.orderUuid);
  // const { orders } = useContext(OrderContext);
  const { isAuthenticated } = useContext(GlobalContext);
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
      } catch (error: any) {
        console.log(error);
      }
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
        console.log(subOrderQuantityResponse.order);
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
    const fetchUserOrders = async () => {
      const orders = await getUserPendingOrders();
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
  }, []);

  return (
    <>
      <Toaster />
      {isAdded ? (
        <div
          key={props.itemUuid}
          className=" text-white text-xl rounded-full bg-azure p-3 w-[300px] my-2 flex justify-between"
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
          className=" text-white rounded-full bg-azure p-3 w-[300px] my-2"
        >
          Add to Cart
        </button>
      )}
    </>
  );
};
