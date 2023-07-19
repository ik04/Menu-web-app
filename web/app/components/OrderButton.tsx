import React, { useState } from "react";
import AddOrder from "../../lib/AddOrder";
import { Toaster } from "react-hot-toast";

export const OrderButton = (props: {
  itemUuid: string;
  quantity?: number;
  isset: boolean;
}) => {
  const [isAdded, setIsAdded] = useState(props.isset);
  const addOrderOnClick = async (itemUuid: string) => {
    try {
      const ordeResponse = await AddOrder(itemUuid);
      console.log(ordeResponse);
      setIsAdded(true);
    } catch (error: any) {
      console.log(error);
    }
  };
  // todo: ui improvements
  const onOrderIncrement = () => {};
  const onOrderDecrement = () => {};

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      {isAdded ? (
        <div className="border border-white text-white text-xl rounded-full bg-hotorange p-3 w-[300px] my-2 flex justify-between">
          <button className="minus">-</button>
          <div className="quantity">{props.quantity}</div>
          <button className="plus">+</button>
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
