import { View, Text, Button, TextInput, TouchableOpacity, Platform } from "react-native";
import { ScrollView } from "react-native";
import { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { getList } from "../api/fetchAPI";

const ListScreen = ({ navigation }) => {

  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    try {
        const getData = await getList();
        setData(getData.data);
    } catch (error) {
      console.log("get token failed");
    }
  };
  useEffect(() => {
    fetchData(); 
  }, []); 
  return (
    <ScrollView style={{ padding: 20 }}>
    {data.map((item, index) => (
      <TouchableOpacity onPress={() => {navigation.navigate("Main", {data: item.ClassYearId})}} key={index}>
  <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 18 }}>Tên: {item.Name}</Text>
        <Text>{item.YearName}</Text>
      </View>
      </TouchableOpacity>
    ))}
    {/* <View style={{flexDirection:'row'}}>
    <Icon name="address-book" size={40}/>
    <Button title="Thong tin lien lac" onPress={() => navigation.navigate("Infomation")}/>
    </View> */}
  </ScrollView>
  
      
  );
}

export default ListScreen;
