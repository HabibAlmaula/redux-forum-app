const api = (() => {
  const BASE_URL = "https://forum-api.dicoding.dev/v1";

  const getAccessToken = () => localStorage.getItem("token");
  const putAccessToken = (token) => localStorage.setItem("token", token);

  const _fetchWithAuth = async (url, options = {}) => {
    return fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        ...options.headers,
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

  const register = async ({ name, email, password }) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  };
  async function getOwnProfile() {
    const response = await _fetchWithAuth(`/users/me`);
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

  async function getThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }
    const {
      data: { threads },
    } = responseJson;

    return threads;
  }

  async function getUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }
    const {
      data: { users },
    } = responseJson;

    return users;
  }

  async function getThread(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`);
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }
    const {
      data: { detailThread },
    } = responseJson;

    return detailThread;
  }

  async function createComment(threadId, content) {
    const response = await _fetchWithAuth(`/threads/${threadId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    return responseJson;
  }


  async function upVoteThread(threadId) {
    const response = await _fetchWithAuth(`/threads/${threadId}/up-vote`, {
      method: "POST",
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    return responseJson;
  }

  async function downVoteThread(threadId) {
    const response = await _fetchWithAuth(`/threads/${threadId}/down-vote`, {
      method: "POST",
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    return responseJson;
  }

  async function neutralizedVoteThread(threadId) {
    const response = await _fetchWithAuth(`/threads/${threadId}/neutral-vote`, {
      method: "POST",
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    return responseJson;
  }

  return {
    getAccessToken,
    putAccessToken,
    login,
    register,
    getOwnProfile,
    getThreads,
    getUsers,
    getThread,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralizedVoteThread,
  };
})();

export default api;
