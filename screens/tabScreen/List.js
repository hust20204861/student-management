import { View, Text, Button, TextInput, TouchableOpacity, Platform } from "react-native";
import { ScrollView } from "react-native";
import styles from "../../styles/style";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDataWithToken } from "../../api/fetchAPI";

const ListScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState();
//hàm lấy token
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('fakeToken');
      if(token){
        setToken(token);
        const getData = await getDataWithToken(token);
        setData(getData);
      }
    } catch (error) {
      console.log("get token failed");
    }
  };
//gọi hàm getToken, chờ getTokenn chạy xong và setToken
  useEffect(() => {
    fetchData(); 
  }, []); 

  return (
    <ScrollView style={{ padding: 20 }}>
    {data.map((item, index) => (
      <TouchableOpacity onPress={() => {navigation.navigate("Profile", {data: item})}} key={index}>
  <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 18 }}>Tên: {item.name}</Text>
        <Text>Lớp: {item.grade}{item.class}</Text>
      </View>
      </TouchableOpacity>
    ))}
    <Button title="Thong tin lien lac" onPress={() => navigation.navigate("Infomation")}/>
  </ScrollView>
  
      
  );
}

export default ListScreen;
