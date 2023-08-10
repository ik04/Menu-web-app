import axios, { AxiosResponse } from "axios";

export default async function FinishOrders() {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/finish-orders`;
  try {
    const resp: AxiosResponse = await axios.post(url);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}
