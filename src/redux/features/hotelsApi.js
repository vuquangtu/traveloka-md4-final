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
  tagTypes: ["hotels"],
  endpoints: (builder) => ({
    fetchhotels: builder.query({
      queryFn: async () => {
        try {
          const hotelsRef = collection(db, "hotels");
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
      providesTags: ["hotels"],
    }),
    fetchhotel: builder.query({
      queryFn: async (id) => {
        try {
          const userRef = doc(db, "hotels", id);
          const snapshot = await getDoc(userRef);
          return { data: snapshot.data() };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["hotels"],
    }),

    addhotel: builder.mutation({
      queryFn: async (hotel) => {
        try {
          await addDoc(collection(db, "hotelImg"), {
            ...hotel,
            timestamp: new Date().toISOString(),
          });
          return { data: "ok" };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["hotels"],
    }),
    updatehotel: builder.mutation({
      queryFn: async ({ id, hotel }) => {
        try {
          await updateDoc(doc(db, "hotels", id), {
            ...hotel,
            timestamp: new Date().toISOString(),
          });
          return { data: "ok" };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["hotels"],
    }),
    deletehotel: builder.mutation({
      queryFn: async (id) => {
        try {
          await deleteDoc(doc(db, "hotels", id));
          return { status: "ok" };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["hotels"],
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
