import jwtDecode, { JwtPayload } from "jwt-decode";
const JWTManager = () => {
  const LOGOUT_EVENT_NAME = "jwt-logout";

  let inMemoryToken: string | null = null;
  let refreshTokenTimeoutId: number | null = null;
  let user_id: number | null = null;

  const getToken = () => inMemoryToken;

  const getAccessToken = () => {
    if (inMemoryToken) return inMemoryToken;
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setToken(accessToken);
      return accessToken;
    }
    return null;
  };

  //const parseJWT = (accessToken: string) => JSON.parse(atob(accessToken.split(".")[1]));

  const isAuth = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      //check if token is expired
      const { exp } = jwtDecode<JwtPayload>(accessToken);
      const currentTime = Date.now() / 1000;
      if (exp) {
        // console.log(
        //   "expired in",
        //   parseJWT(accessToken).exp - Math.floor(Date.now() / 1000)
        // );
        if (exp < currentTime) {
          console.log("Token Expired");
          localStorage.removeItem("accessToken");
          deleteToken();
          return false;
        }
        setToken(accessToken);
        return true;
      }
    }
    return false;
  };

  const getUserId = () => user_id;

  const SetUserDetail = (display_name: string, role: string, user_id: string) => {
    localStorage.setItem("display_name", display_name);
    localStorage.setItem("role", role);
    localStorage.setItem("user_id", user_id)
  }

  const setToken = (accessToken: string) => {
    inMemoryToken = accessToken;
    localStorage.setItem("accessToken", accessToken);
    // Decode and set countdown to refresh
    const decoded = jwtDecode<JwtPayload & { user_id: number }>(accessToken);
    user_id = decoded.user_id;

    //setRefreshTokenTimeout((decoded.exp as number) - (decoded.iat as number));
    return true;
  };

  const abortRefreshToken = () => {
    if (refreshTokenTimeoutId) window.clearTimeout(refreshTokenTimeoutId);
  };

  const deleteToken = () => {
    inMemoryToken = null;
    abortRefreshToken();
    // Delete from local storage
    localStorage.clear();
    window.localStorage.setItem(LOGOUT_EVENT_NAME, Date.now().toString());
    return true;
  };

  // To logout all tabs (nullify inMemoryToken)
  window.addEventListener("storage", (event) => {
    if (event.key === LOGOUT_EVENT_NAME) inMemoryToken = null;
  });

  const getRefreshToken = async () => {
    console.log("Get Refresh Token");
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + "/refresh_token",
        {
          credentials: "include",
        }
      );
      const data = (await response.json()) as {
        success: boolean;
        accessToken: string;
      };
      setToken(data.accessToken);
      return true;
    } catch (error) {
      deleteToken();
      return false;
    }
  };

  // const setRefreshTokenTimeout = (delay: number) => {
  //   // 5s before token expires
  //   refreshTokenTimeoutId = window.setTimeout(
  //     getRefreshToken,
  //     delay * 1000 - 5000
  //   );
  // };

  return {
    SetUserDetail,
    getToken,
    getAccessToken,
    setToken,
    getRefreshToken,
    deleteToken,
    getUserId,
    isAuth,
  };
};

export default JWTManager();
