const api = (() => {
  const BASE_URL = "https://forum-api.dicoding.dev/v1";

  const getAccessToken = () => localStorage.getItem("token");
  const putAccessToken = (token) => localStorage.setItem("token", token);

  const _fetchWithAuth = async (url, option) => {
    console.log("fetchWithAuth");
    return fetch(`${BASE_URL}${url}`, {
      ...option,
      headers: {
        ...option.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  };

  const login = async ({ email, password }) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { token },
    } = responseJson;

    return token;
  };

  async function getOwnProfile() {
    console.log("getOwnProfile");
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    console.log("response", response);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  return {
    getAccessToken,
    putAccessToken,
    login,
    getOwnProfile,
  };
})();

export default api;
