import axios from "axios";

export default async function GetCategories() {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-categories`;
  const resp = await axios.get(url);
  return resp;
}
