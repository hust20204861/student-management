import { Alert, TouchableWithoutFeedback, View, Text  } from "react-native";
import { useState, useEffect } from "react";
import DataRenderer from "../../services/renders/ActionRender";
import { getActions } from "../../api/fetchAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


const PublicActions = ({route}) => {

  const [data, setData] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [inputShow, setInputShow] = useState(false)
  const [end, setEnd] = useState(false)
  const id = route.params.data;
  const type = 1;

  const handleShow = () => {
    setInputShow(!inputShow);
  }

  const fetchData = async (page) => {
    setRefreshing(true);
    try {
      const key = `data${type}`;
      const getData = await AsyncStorage.getItem(key);
      if(getData){
        setData(JSON.parse(getData))
      }
        const response = await getActions(id, type, search, page);
        const pageData = response.data.data;
        setData(prev => {
          if(response.data.current_page == 1){
            return pageData;
          }
          const allData = prev.concat(pageData);
          return allData;
        });
        setTotalPage(response.data.last_page); 
        setCurrentPage(response.data.current_page)
      // Khởi tạo trạng thái loading cho tất cả các phần tử
      const initLoadingState = {};
      pageData.forEach(item => { initLoadingState[item.Id] = true });
      setLoadingStates(initLoadingState);
      // Cập nhật trạng thái loading từng phần tử sau khi tải xong
      pageData.forEach(item => {
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
      }
      if (currentPage == totalPage){
      setEnd(true);
      }
    };
  return(
    <View style={{ flex: 1, }}>
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
      <View >
      <TouchableWithoutFeedback onPress={handleShow}>
      <Icon name='search' size={24} style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 20, paddingRight: 20, backgroundColor:'white'}}/>
      </TouchableWithoutFeedback>
      </View>}
      <DataRenderer data = {data} loadingStates={loadingStates} refreshing={refreshing} onRefresh={fetchData} loadMore={loadMore} />
    </View>
  )
}

export default PublicActions