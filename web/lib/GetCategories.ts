import axios from "axios";

export default async function GetCategories() {
  const url = "http://localhost:8000/api/v1/get-categories";
  const resp = await axios.get(url);
  return resp;
}
