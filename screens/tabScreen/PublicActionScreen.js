import { View, Text, Button, TextInput, TouchableOpacity, Platform, ScrollView } from "react-native";
import styles from "../../styles/style";
import { useState, useEffect } from "react";
import { getPublicActions } from "../../api/fetchAPI";
import DataRenderer from "../../services/renders/ActionRender";
import AsyncStorage from "@react-native-async-storage/async-storage";


const PublicActions = () => {

  const [data, setData] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async () => {
    setRefreshing(true)
    try {
      const getData = await getPublicActions();
      //tạo đối tượng init với mỗi thuộc tính là trạng thái của từng phần tử trong getData
      const initLoadingState = {};
      getData.forEach(item => { initLoadingState[item.id] = true });
      setLoadingStates(initLoadingState); 

      setData(getData); 
      //khi một phần tử được tải xong, cập nhật trạng thái loading phần tử đó là flase
      getData.forEach(item => {
        // setTimeout(() => {
          setLoadingStates(prevLoadingStates => ({...prevLoadingStates,[item.id]: false }));
        // },500)
          
      });
      
    } catch (error) {
      console.log("Failed to get data:", error);
    }finally{
      setRefreshing(false);
    }
    };
    // useEffect(() => {
    //   console.log("Loading states:", loadingStates);
    // }, [loadingStates]);

    useEffect(() => {
      fetchData();
    }, []);

  return(
    <View >
       <DataRenderer data = {data} loadingStates={loadingStates} refreshing={refreshing} onRefresh={fetchData}/>
    </View>
   
  )
}

export default PublicActions