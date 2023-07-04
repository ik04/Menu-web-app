import axios from "axios";

export default async function getUserData() {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-user-data`;
  const resp = await axios.get(url, { withCredentials: true });
  return resp;
}
