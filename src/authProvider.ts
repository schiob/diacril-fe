import axios from "axios";
import { addRefreshAuthToAuthProvider, AuthProvider, HttpError } from "react-admin";
import jwt_decode, { JwtPayload } from "jwt-decode";

const backendBase = import.meta.env.VITE_JSON_SERVER_URL;

export const refreshAuth = () => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    let decoded = jwt_decode<jwt>(token);
    var expDate = new Date(0);
    expDate.setUTCSeconds(decoded.exp as number);
    var nowDate = new Date();

    // 600000 ms == 10 min
    if (expDate.getTime() - 600000 < nowDate.getTime()) {
      // update token
      return refreshToken(token);
    }
    return Promise.resolve();
  }
  return Promise.resolve();
};

const refreshToken = async (token: string) => {
  try {
    let response = await axios.post(
      backendBase + "/refresh",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    // Handle the response
    let newToken = response.headers["authorization"].split(" ")[1];
    let decoded = jwt_decode<jwt>(newToken);
    // console.log(decoded);

    let userToPersist = {
      id: decoded.userid,
      username: decoded.usermail,
      fullName: decoded.username,
      permissions: decoded.permissions,
      avatar: "",
    };

    localStorage.setItem("user", JSON.stringify(userToPersist));
    localStorage.setItem("token", newToken);
    return Promise.resolve();
  } catch (error) {
    // Handle any errors
    return Promise.reject(
      new HttpError("Unauthorized", 401, {
        message: "Invalid username or password",
      })
    );
  }
};

interface jwt extends JwtPayload {
  userid: string;
  username: string;
  usermail: string;
  permissions: Array<string>;
}

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      let response = await axios.post(
        backendBase + "/login",
        {},
        {
          headers: {
            Authorization: "Basic " + btoa(`${username}:${password}`),
          },
        }
      );

      // Handle the response
      let token = response.headers["authorization"].split(" ")[1];
      let decoded = jwt_decode<jwt>(token);
      // console.log(decoded);

      let userToPersist = {
        id: decoded.userid,
        username: decoded.usermail,
        fullName: decoded.username,
        permissions: decoded.permissions,
        avatar: "",
      };

      localStorage.setItem("user", JSON.stringify(userToPersist));
      localStorage.setItem("token", token);
      return Promise.resolve();
    } catch (error) {
      // Handle any errors

      return Promise.reject(
        new HttpError("Unauthorized", 401, {
          message: "Invalid username or password",
        })
      );
    }
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => {
    let token = localStorage.getItem("token");
    if (token !== null) {
      let decoded = jwt_decode<jwt>(token);
      var expDate = new Date(0);
      expDate.setUTCSeconds(decoded.exp as number);
      var nowDate = new Date();

      if (expDate.getTime() > nowDate.getTime()) {
        return Promise.resolve();
      }
    }
    return Promise.reject();
  },
  getPermissions: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user.permissions);
  },
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user);
  },
};

export default addRefreshAuthToAuthProvider(authProvider, refreshAuth);
