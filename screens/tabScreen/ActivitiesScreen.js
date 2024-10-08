import { Alert, TouchableWithoutFeedback, View, Text  } from "react-native";
import { useState, useEffect } from "react";
import DataRenderer from "../../services/renders/ActionRender";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { getActivities } from "../../api/fetchAPI";
import { PaginationData } from "../../services/renders/PaginationData";

const Activities = ({route}) => {
  
  const [search, setSearch] = useState('')
  const [inputShow, setInputShow] = useState(false)
  const id = route.params.data;

  let url = `/api/school/v1/parent/activities/${id}`;
  let url1 = `/api/school/v1/parent/activities/${id}`;

  const { data, loadingStates, refreshing, loadMore, fetchData } = PaginationData(url1, url, null, search);
  console.log(data)
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
      <DataRenderer data = {data} loadingStates={loadingStates} refreshing={refreshing} onRefresh={handleRefresh} loadMore={loadMore} />
    </View>
  )
}

export default Activities