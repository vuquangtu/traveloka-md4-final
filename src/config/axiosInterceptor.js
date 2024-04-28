import privateAxios from "./privateAxios";
import { saveUser, removeUser } from "../redux/features/userSlice";
import store from "../redux/app/store";

export function SetPrivateAxiosResponse() {
  const interceptor = privateAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error.response.data.status !== 401 &&
        error.response.data.status !== 403
      ) {
        return Promise.reject(error);
      }

      privateAxios.interceptors.response.eject(interceptor);
      let user = JSON.parse(localStorage.getItem("user"));
      let refreshToken = user.refreshToken;
      return privateAxios
        .post(
          "/api/refresh-token",
          {},
          { headers: { "Refresh-Token": refreshToken } }
        )
        .then((response) => {
          let newToken = response.data;

          let newUser = {
            ...user,
            token: newToken,
          };
          store.dispatch(saveUser(newUser));

          error.response.config.headers["Authorization"] =
            "Bearer " + response.data.access_token;
          return privateAxios(error.response.config);
        })
        .catch((error2) => {
          console.log(error2);
          store.dispatch(removeUser());
          return Promise.reject(error2);
        })
        .finally(SetPrivateAxiosResponse);
    }
  );
}

export function SetPrivateAxiosRequest() {
  privateAxios.interceptors.request.use((config) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      const token = user.token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}
