import { Alert, TouchableWithoutFeedback, View,  } from "react-native";
import { useState, useEffect } from "react";
import DataRenderer from "../../services/renders/ActionRender";
import { getActivities } from "../../api/fetchAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


const Activities = ({route}) => {

  const [data, setData] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [inputShow, setInputShow] = useState(false)
  const id = route.params.data;

  const handleShow = () => {
    setInputShow(!inputShow);
  }

  let allData = [];
  const fetchData = async (page) => {
    setRefreshing(true);
    try {
       
      const getData = await AsyncStorage.getItem('activities');
      if(getData){
        setData(JSON.parse(getData))
      }

        const response = await getActivities(id, search, page);
        const pageData = response.data.data;
        setTotalPage(response.data.last_page); 
        setCurrentPage(response.data.current_page)
        allData = allData.concat(pageData); 
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
    }, [search]);

    const loadMore = () => {
      if (currentPage < totalPage) {
        fetchData(currentPage +1);  
        console.log("ok")
      }
      if (currentPage == totalPage){
      Alert.alert("End")
      }
    };
  return(
    <View >
      {inputShow && 
      <View>
      <TextInput style={{width: '100%',
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      paddingHorizontal: 64,
      marginVertical: 1,
      fontSize: 16,
      backgroundColor:'white'}}
      placeholder="Nhập nội dung tìm kiếm"
      value={search}  
      onChangeText={(text) => setSearch(text)}/>
      <TouchableWithoutFeedback onPress={handleShow}>
      <Icon name='chevron-left' size={24} style={{ position: 'absolute', left:0, alignItems:'center', paddingTop: 8, paddingBottom: 8, paddingLeft: 20, paddingRight: 20,}}/>
      </TouchableWithoutFeedback>
      
      </View>}
      {!inputShow && 
      <TouchableWithoutFeedback onPress={handleShow}>
      <Icon name='search' size={24} style={{right:0, paddingTop: 8, paddingBottom: 8, paddingLeft: 20, paddingRight: 20, backgroundColor:'white'}}/>
      </TouchableWithoutFeedback>}
      <DataRenderer data = {data} loadingStates={loadingStates} refreshing={refreshing} onRefresh={fetchData} loadMore={loadMore}/>
    </View>
  )
}

export default Activities