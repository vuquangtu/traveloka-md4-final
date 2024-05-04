import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase/config";

const hotelsApi = createApi({
  reducerPath: "hotelsApi",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["comments"],
  endpoints: (builder) => ({
    fetchhotels: builder.query({
      queryFn: async () => {
        try {
          const hotelsRef = collection(db, "comments");
          console.log(hotelsRef);
          const querySnapshot = await getDocs(hotelsRef);
          const listHotels = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return { data: listHotels };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["comments"],
    }),
    fetchhotel: builder.query({
      queryFn: async (id) => {
        try {
          const userRef = doc(db, "comments", id);
          const snapshot = await getDoc(userRef);
          return { data: snapshot.data() };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["comments"],
    }),

    addhotel: builder.mutation({
      queryFn: async (comment) => {
        try {
          await addDoc(collection(db, "comments"), {
            ...comment,
            timestamp: new Date().toISOString(),
          });
          return { data: "ok" };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["comments"],
    }),
    updatehotel: builder.mutation({
      queryFn: async ({ id, comment }) => {
        try {
          await updateDoc(doc(db, "comments", id), {
            ...comment,
            timestamp: new Date().toISOString(),
          });
          return { data: "ok" };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["comments"],
    }),
    deletehotel: builder.mutation({
      queryFn: async (id) => {
        try {
          await deleteDoc(doc(db, "comments", id));
          return { status: "ok" };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["comments"],
    }),
  }),
});

export const {
  useFetchhotelQuery,
  useFetchhotelsQuery,
  useAddhotelMutation,
  useDeletehotelMutation,
  useUpdatehotelMutation,
} = hotelsApi;
export default hotelsApi;
