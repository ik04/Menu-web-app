import { Order } from "@/types/types";
import axios, { AxiosResponse } from "axios";

interface Data {
  message: string;
  orders: Order[];
}

export default async function getUserPendingOrders() {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-pending-orders`;
  const resp: AxiosResponse<Data> = await axios.get(url);
  return resp.data.orders;
}
