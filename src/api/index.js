import axios from "axios";
import { signIn, signOut } from "../redux/auth";

// Using axios interceptor for  accessToken

export const interceptor = (store) => {
  axios.interceptors.response.use(
    (response) => {
      const accessToken = response.headers["x-access-token"];

      if (accessToken) {
        store.dispatch(signIn({ accessToken }));
      }

      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        store.dispatch(signOut());
      }

      return Promise.reject(error);
    }
  );

  axios.interceptors.request.use((config) => {
    const { auth } = store.getState("auth");
    const accessToken = auth.accessToken;

    if (accessToken) {
      config.headers["Authorization"] = `Shelf ${accessToken}`;
    }

    return config;
  });
};

export default axios;
