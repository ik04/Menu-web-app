import { CategoryResponse } from "@/types/types";
import axios, { AxiosResponse } from "axios";

export default async function GetCategories() {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-categories`;
  try {
    const resp: AxiosResponse<CategoryResponse> = await axios.get(url);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}
