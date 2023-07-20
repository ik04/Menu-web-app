import { Order } from "@/types/types";
import axios, { AxiosResponse } from "axios";

export default async function getUserPendingOrders() {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-pending-orders`;
  const resp: AxiosResponse<Order[]> = await axios.get(url);
  return resp;
}
