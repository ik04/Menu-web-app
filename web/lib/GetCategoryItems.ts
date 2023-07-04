import { CategoryFormData } from "@/types/types";
import axios from "axios";

export default async function getCategoryItems(formdata: CategoryFormData) {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-category-items`;
  try {
    const resp = await axios.post(url, formdata);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}
