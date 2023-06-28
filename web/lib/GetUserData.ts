import axios from "axios";

export default async function getUserData() {
  const url = "http://localhost:8000/api/v1/get-user-data";
  const resp = await axios.get(url, { withCredentials: true });
  return resp;
}
