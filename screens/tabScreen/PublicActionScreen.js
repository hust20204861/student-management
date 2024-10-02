import { View,  } from "react-native";
import { useState, useEffect } from "react";
import DataRenderer from "../../services/renders/ActionRender";
import { getActions } from "../../api/fetchAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";


const PublicActions = ({route}) => {

  const [data, setData] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [refreshing, setRefreshing] = useState(false)
  const id = route.params.data;
  const type = 1;

 
  const fetchData = async () => {
    setRefreshing(true);
    let allData = []; 
    let currentPage = 1; 
    let totalPages = 1; 

    try {
      const key = `data${type}`;
      const getData = await AsyncStorage.getItem(key);
      if(getData){
        setData(JSON.parse(getData))
      }
      
      while (currentPage <= totalPages) {
        const response = await getActions(id, type, null, currentPage);
        const pageData = response.data.data;
        totalPages = response.data.last_page; 
        allData = [...allData, ...pageData]; // Kết hợp dữ liệu từ trang mới vào mảng
        currentPage++; 
      }
      setData(allData); 

      // Khởi tạo trạng thái loading cho tất cả các phần tử
      const initLoadingState = {};
      allData.forEach(item => { initLoadingState[item.Id] = true });
      setLoadingStates(initLoadingState);
      // Cập nhật trạng thái loading từng phần tử sau khi tải xong
      allData.forEach(item => {
        setLoadingStates(prevLoadingStates => ({ ...prevLoadingStates, [item.Id]: false }));
      });

    } catch (error) {
      console.log("Failed to get data:", error);
    } finally {
      setRefreshing(false);
    }
};

    // useEffect(() => {
    //   console.log("Loading public:", loadingStates);
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