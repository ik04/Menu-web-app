import axios from "axios";

export default async function logout() {
  const url = `${process.env.DOMAIN_NAME}/api/v1/logout`;
  const resp = await axios.post(url, { withCredentials: true });
  return resp;
}
