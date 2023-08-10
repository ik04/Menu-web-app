import React from "react";
import CheckoutMenu from "../components/CheckoutMenu";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios from "axios";

export default async function page() {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("at");
    console.log(authToken?.value);
    const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-user-data`;
    const resp = await axios.get(url, {
      headers: { Cookie: `at=${authToken?.value}` },
    });

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${resp.data.access_token}`;

    const url1 = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/is-logged-in`;
    const resp1 = await axios.post(url1, {}, { withCredentials: true });
    console.log(resp1);
    console.log("works");
    const url2 = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-order-count`;
    const resp2 = await axios.get(url2, { withCredentials: true });
    console.log(resp2);
    if (resp2.data.order_count === 0) {
      return redirect("/");
    }
  } catch (error) {
    console.log(error);
    return redirect("/");
  }
  return (
    <div className="">
      <CheckoutMenu />
    </div>
  );
}
