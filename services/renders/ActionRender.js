import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Dimensions, Modal } from 'react-native';
import ImageLoading from '../loadings/ImageLoading';
import styles from '../../styles/style';
import AttachmentsRender from './AttachmentsRender';
import Icon from 'react-native-vector-icons/FontAwesome';
import { likeStatus } from '../../api/fetchAPI';
import { PaginationData } from './PaginationData';

const RenderItem = React.memo(({ item, loadingStates, handleGetUsersLike, contentType}) => {
  const [colorLike, setColorLike] = useState('')
  
  const handleLike = async(id, contentType) => {
    const response = await likeStatus(id, contentType);
    console.log(response)
  }
  useEffect(() => {
    if(item.Liked == true){
      setColorLike("red")
    }else{
      setColorLike("black");
    }
  },[])
  return (
    <View style={{ flex:1}}>
      {loadingStates[item.Id] ? (
        <View key={item.Id} style={{ marginBottom: 30 }}>
          <ImageLoading />
        </View>
      ) : (
        <View key={item.Id} style={styles.actionsContainer}>
          <View style={{ paddingLeft: 15, paddingRight: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 5, marginTop:15, color:'black' }}>
              {item.Title}
            </Text>
            {item.Content && (<Text style={{ fontSize: 18, marginBottom: 5, color:'black' }}>{item.Content}</Text>)}
          </View>
          <AttachmentsRender items={item.Attachments} />
          {item.TotalLike > 0 && <TouchableOpacity style={{ margin: 5, right:0,flexDirection:'row',}} onPress={handleGetUsersLike}>
          <Text>{item.TotalLike}</Text>
          <Icon name='heart' size={15} style={{ margin: 5, right:0, color:"red" }}/>  
          </TouchableOpacity>}
          
          <View style={{flexDirection:'row',}}>
          <TouchableOpacity onPress={() => handleLike(item.Id, 'contact')} style={{ margin: 5, right:0,}}>
          <Icon name='heart' size={24} style={{ margin: 5, right:0, color:colorLike }}/>  
          </TouchableOpacity>
          <Text style={{ margin: 10, color:'black', position:'absolute', right:0 }}>{item.ContactDate}</Text>
          </View>
        </View>
      )}
    </View>
  );
});

const DataRenderer = ({ data, loadingStates, refreshing, onRefresh, loadMore, contentType }) => {
  const [isShowUsers, setIsShowUsers] = useState(false);
  const [user, setUser] = useState([]);
  const [loadMoreUsers, setLoadMoreUser] = useState(null);

  let url = `/api/school/v1/parent/interaction/liked-users`;
  let url1 = `/api/school/v1/parent/interaction/liked-users`;

  const handleGetUsersLike = async(item) => {
    try{
      const { data, loadingStates, refreshing, loadMore, end, fetchData } =  PaginationData(url1, url, null, null, item.Id, contentType);
      setIsShowUsers(true);
      setUser(data);
      setLoadMoreUser(loadMore)
    }catch(error){
      console.log("Error:", error)
    }
  }

  const handleClose = () => {
    setIsShowUsers(false)
  }

const RenderUsersLike = ({data}) => {
  return(
    <View style={{width:Dimensions.get('window').width, height: 30, borderBottomColor:'white', borderWidth:1}}>
    <TouchableOpacity>
      <Text style={{color:'white',}}>{data.FullName}</Text>
    </TouchableOpacity>
    </View>
  )
}

  return (
    <View style={{ backgroundColor:"#c7c8c9",}}>
      <FlatList
        data={data}
        renderItem={({ item }) => <RenderItem item={item} loadingStates={loadingStates} handleGetUsersLike={() => handleGetUsersLike(item)} contentType={contentType}/>} 
        keyExtractor={(item) => item.Id.toString()} 
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={loadMore}
        onEndReachedThreshold={0.7}
      />
      <Modal visible={isShowUsers}
            transparent={true}
            onRequestClose={handleClose}>
           <View style={styles.modalContainer}>
            <TouchableOpacity onPress={handleClose}>
            <Icon name="remove" size={30} style={{color:'white', left:0}}/> 
            </TouchableOpacity>
             <FlatList data={user}
                      renderItem={({item}) => <RenderUsersLike data={item}/>}
                      keyExtractor={(user) => user.Id.toString()}
                      onEndReached={loadMoreUsers}
                      onEndReachedThreshold={0.5}
                      />
           </View>
      </Modal>
    </View>
  );
};

export default DataRenderer;

