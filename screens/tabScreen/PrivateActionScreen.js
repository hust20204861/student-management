import { Alert, TouchableWithoutFeedback, View, Text, Modal, FlatList, TouchableOpacity, Dimensions  } from "react-native";
import { useState, useEffect } from "react";
import DataRenderer from "../../services/renders/ActionRender";
import { getActions } from "../../api/fetchAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { PaginationData } from "../../services/renders/PaginationData";

const PrivateActions = ({route}) => {
  const [dataPublic, setDataPublic] = useState([])
  const [search, setSearch] = useState('')
  const [inputShow, setInputShow] = useState(false)
  const id = route.params.data;
  const type = 2;

  let url = `/api/school/v1/parent/contacts/${id}`;
  let url1 = `/api/school/v1/parent/contacts/${id}`;

  useEffect(() => {
    const fetchDataFromStorage = async () => {
      try {
        const key = `data${url1}/${type}`;
        const response = await AsyncStorage.getItem(key); 
        setDataPublic(JSON.parse(response));
      } catch (error) {
        console.log("Error fetching data from AsyncStorage:", error);
      }
    };
    fetchDataFromStorage();
  }, []); 

  const { data, loadingStates, refreshing, loadMore, fetchData } = PaginationData(url1, url, type, search);

  useEffect(() => {
    if (data.length > 0) {
      setDataPublic(data);
    }
  }, [data]); 
    const handleShow = () => {
      setInputShow(!inputShow);
    }
    const handleRefresh = () => {
      fetchData(); 
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
      <Icon name='chevron-left' size={24} style={{ position:'absolute', left:0, alignItems:'center', paddingTop: 8, paddingBottom: 8, paddingLeft: 20, paddingRight: 20,}}/>
      </TouchableWithoutFeedback>
      </View>}
      {!inputShow && 
      <View >
      <TouchableWithoutFeedback onPress={handleShow}>
      <Icon name='search' size={24} style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 20, paddingRight: 20, backgroundColor:'white'}}/>
      </TouchableWithoutFeedback>
      </View>}
      <DataRenderer data = {dataPublic} loadingStates={loadingStates} refreshing={refreshing} onRefresh={handleRefresh} loadMore={loadMore} contentType={'contact'}/>
    </View>
  )
}

export default PrivateActions