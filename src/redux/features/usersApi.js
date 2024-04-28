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

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    fetchusers: builder.query({
      queryFn: async () => {
        try {
          const usersRef = collection(db, "users");
          const querySnapshot = await getDocs(usersRef);
          const listUsers = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return { data: listUsers };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["users"],
    }),
    fetchuser: builder.query({
      queryFn: async (id) => {
        try {
          const userRef = doc(db, "users", id);
          const snapshot = await getDoc(userRef);
          return { data: snapshot.data() };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["users"],
    }),

    adduser: builder.mutation({
      queryFn: async (user) => {
        try {
          await addDoc(collection(db, "users"), {
            ...user,
            timestamp: new Date().toISOString(),
          });
          return { data: "ok" };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["users"],
    }),
    updateuser: builder.mutation({
      queryFn: async ({ id, user }) => {
        try {
          await updateDoc(doc(db, "users", id), {
            ...user,
            timestamp: new Date().toISOString(),
          });
          return { data: "ok" };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["users"],
    }),
    deleteuser: builder.mutation({
      queryFn: async (id) => {
        try {
          await deleteDoc(doc(db, "users", id));
          return { status: "ok" };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useFetchuserQuery,
  useFetchusersQuery,
  useAdduserMutation,
  useDeleteuserMutation,
  useUpdateuserMutation,
} = usersApi;
export default usersApi;
