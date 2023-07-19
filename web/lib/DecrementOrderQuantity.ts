import axios, { AxiosResponse } from "axios";

export default async function DecrementOrderQuantity(
  orderUuid: string | undefined
) {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/decrease-order-quantity`;
  try {
    const resp: AxiosResponse = await axios.post(url, {
      order_uuid: orderUuid,
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}
