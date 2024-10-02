import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchApi } from "./baseApi";


export const Login = async ({email, password}) => {
  try{
    const response = await fetchApi('/api/school/v1/parent/login', 'POST', {email, password});
    if(!response.ok){
      throw new Error('Login faild');
    }
    const data = await response.json();
    if (data.code==200) {
      await AsyncStorage.setItem('refreshToken', data.data.token.refresh_token);
      await AsyncStorage.setItem('accessToken', data.data.token.access_token);
    }
    return data;
}catch(error){
  console.error('Login error:', error.message);
  throw error; 
};
}


export const getActions = async (id, type, search = null, page = 1) => {
  try{
    let url = `/api/school/v1/parent/contacts/${id}`;
    const params = new URLSearchParams();
    if (type) {
      params.append('type', type); 
    }
    if (search) {
      params.append('search', search);
    }
    if (page) {
      params.append('page', page);
    }
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    const response = await fetchApi(url);
    if(!response.ok){
      throw new Error('Get Data Failed');
    }
    const data = await response.json();
    if (data.code==200 && data.data.current_page==1) {
      const key = `data${type}`; 
      await AsyncStorage.setItem(key, JSON.stringify(data.data.data));
    }
    return data;
  }catch(error){
    console.error(error.message)
    throw error;
  }
}

export const getList = async () => {
  try{
    const response = await fetchApi("/api/school/v1/parent/classes")
    const data = await response.json();
    return data;
  }catch(error){
    Alert.alert(error.message)
    throw error;
  }
}

