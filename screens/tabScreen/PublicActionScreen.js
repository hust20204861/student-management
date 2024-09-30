import { View,  } from "react-native";
import { useState, useEffect } from "react";
import DataRenderer from "../../services/renders/ActionRender";
import { getActions } from "../../api/fetchAPI";


const PublicActions = ({route}) => {

  const [data, setData] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [refreshing, setRefreshing] = useState(false)
  const id = route.params.data;
  const type = 1;

  const fetchData = async () => {
    setRefreshing(true)
    try {
      const response = await getActions(id, type);
      const Data = await response.data.data
      setData(Data);

      //tạo đối tượng init với mỗi thuộc tính là trạng thái của từng phần tử trong getData
      const initLoadingState = {};
      Data.forEach(item => { initLoadingState[item.Id] = true });
      setLoadingStates(initLoadingState); 
      //khi một phần tử được tải xong, cập nhật trạng thái loading phần tử đó là flase
      Data.forEach(item => {
        //  setTimeout(() => {
          setLoadingStates(prevLoadingStates => ({...prevLoadingStates,[item.Id]: false }));
        //  },3000)
      });
    } catch (error) {
      console.log("Failed to get data:", error);
    }finally{
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