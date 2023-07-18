import axios, { AxiosResponse } from "axios";

export default async function AddOrder(itemUuid: string) {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/add-order`;
  try {
    const resp: AxiosResponse = await axios.post(url, { item_uuid: itemUuid });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}
