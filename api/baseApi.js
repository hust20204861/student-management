import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = 'https://beta.edulive.net';
const fetchApi = async(url,method='GET', body=null ) => {
    const accessToken = await  AsyncStorage.getItem('accessToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
  };
  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });
  if (response.status === 401) {
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      return await fetch(`${BASE_URL}${url}`, {
        method,
        headers: {
          ...headers,
          'Authorization': `Bearer ${newAccessToken}`,
        },
        body: body ? JSON.stringify(body) : null,
      });
    }
  }

  return response;
};


const refreshAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(`${BASE_URL}/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  const data = await response.json();

  if (data.token) {
    await AsyncStorage.setItem('accessToken', data.token.access_token);
    return data.token.access_token;
  } else {
    throw new Error("Failed to refresh token");
  }
};

export  {
    fetchApi,
    refreshAccessToken,
  };