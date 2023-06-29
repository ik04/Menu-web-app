import axios from "axios";

export default async function logout() {
  const url = "http://localhost:8000/api/v1/logout";
  const resp = await axios.post(url, { withCredentials: true });
  return resp;
}
