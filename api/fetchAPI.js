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

export const getActivities = async (id, search = null, page = 1) => {
  try{
    let url = `/api/school/v1/parent/activities/${id}`;
    const params = new URLSearchParams();
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
    const data = await response.json();
    if (data.code==200 && data.data.current_page==1) {
      await AsyncStorage.setItem('activities', JSON.stringify(data.data.data));
    }
    return data;
  }catch(error){
    Alert.alert(error.message)
    throw error;
  }
}

export const likeStatus = async(id, contentType) => { 
  try{
    const response = await fetchApi('/api/school/v1/parent/interaction/like', 'POST', {content_id: id, content_type: contentType});
    if(!response.ok){
      console.log("like failed")
    }
    console.log("like success")
    const data = response.json();
    return data;
  }catch(error){
    console.error('Lỗi:', error);
  }
}


export const getUsersLike = async (id, contentType,  page = 1) => {
  try{
    let url = `/api/school/v1/parent/interaction/liked-users`;
    const params = new URLSearchParams();
    if (id) {
      params.append('content_id', id); 
    }
    if (contentType) {
      params.append('content_type', contentType);
    }
    if (page) {
      params.append('page', page);
    }
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    const response = await fetchApi(url);
    if(!response.ok){
      throw new Error('Get Users Failed');
    }
    const data = await response.json();
    if (data.code==200) {

    }
    return data;
  }catch(error){
    console.error(error.message)
    throw error;
  }
}

export const getPagination = async(url) => {
  try{
    const response = await fetchApi(url)
    if(response.ok){
      const data = response.json();
      return data;
    }
  }catch(error){
    console.error(error.message)
    throw error;
  }

}