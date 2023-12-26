import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:5000" });

const apiSlice = createApi({
  baseQuery,
  tagTypes:["User"],
  endpoints:(builder)=>({})
});

export default apiSlice