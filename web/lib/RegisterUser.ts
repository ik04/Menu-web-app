import { userFormdata } from "@/types/types";
import axios from "axios";

export default async function registerUser(formdata: userFormdata) {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/register`;
  const resp = await axios.post(url, formdata);
  return resp;
}
