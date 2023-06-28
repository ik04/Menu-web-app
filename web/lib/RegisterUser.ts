import { userFormdata } from "@/types/types";
import axios from "axios";

export default async function registerUser(formdata: userFormdata) {
  const url = "http://localhost:8000/api/v1/register";
  const resp = await axios.post(url, formdata);
  return resp;
}
