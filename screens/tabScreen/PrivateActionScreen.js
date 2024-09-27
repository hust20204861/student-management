import DataRenderer from "../../services/renders/ActionRender";
import { getPrivateActions } from "../../api/fetchAPI";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";

const PrivateActions = () => {
  const [data, setData] = useState([]);
  const [loadingStates, setLoadingStates] = useState({})


  const fetchData = async () => {
    try {
      const getData = await getPrivateActions();
      //tạo đối tượng init với mỗi thuộc tính là trạng thái của từng phần tử trong getData
      const initLoadingState = {};
      getData.forEach(item => { initLoadingState[item.id] = true });
      setLoadingStates(initLoadingState); 

      setData(getData); 
      //khi một phần tử được tải xong, cập nhật trạng thái loading phần tử đó là flase
      getData.forEach(item => {
          setLoadingStates(prevLoadingStates => ({...prevLoadingStates,[item.id]: false }));
      });
      
    } catch (error) {
      console.log("Failed to get data:", error);
    } 
    };
    // useEffect(() => {
    //   console.log("Loading states:", loadingStates);
    // }, [loadingStates]);

    useEffect(() => {
      fetchData();
    }, []);
 
  return(
    <View>
    <DataRenderer data = {data} loadingStates={loadingStates}/>
    </View>
  )
}

export default PrivateActions