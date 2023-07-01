import axios from "axios";

export default async function logout() {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/logout`;
  const resp = await axios.post(url);
  return resp;
}
