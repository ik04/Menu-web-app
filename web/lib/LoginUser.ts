import { loginFormData, userFormdata } from "@/types/types";
import axios from "axios";

export default async function loginUser(formdata: loginFormData) {
  const url = "http://localhost:8000/api/v1/login";
  const resp = await axios.post(url, formdata, { withCredentials: true });
  return resp;
}
