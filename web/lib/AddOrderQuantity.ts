import axios, { AxiosResponse } from "axios";

export default async function AddOrderQuantity(orderUuid: string | undefined) {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/add-order-quantity`;
  try {
    const resp: AxiosResponse = await axios.post(url, {
      order_uuid: orderUuid,
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}
