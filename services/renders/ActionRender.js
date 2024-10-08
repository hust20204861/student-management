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
  
  const handleLike = async(id) => {
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
          <TouchableOpacity onPress={() => handleLike(item.Id)} style={{ margin: 5, right:0,}}>
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
  const [selectedItem, setSelectedItem] = useState(null);
  let url = '/api/school/v1/parent/interaction/liked-users';
  let url1 = '/api/school/v1/parent/interaction/liked-users';

  const handleGetUsersLike = async(item) => {
    setSelectedItem(item);
    setIsShowUsers(true);
  }
  const handleClose = () => {
    setIsShowUsers(false)
    setSelectedItem(null);
  }

  const RenderUsersLike = ({ item, url, url1, contentType }) => {
    const { data: userData, loadMore } = PaginationData(url1, url, null, null, item.Id, contentType);
    return (
      <FlatList
        data={userData}
        renderItem={({ item: user }) => (
          <TouchableOpacity style={{ width: Dimensions.get('window').width, padding:20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>{user.FullName}</Text>
            <View
            style={{
              width: '90%', 
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              marginTop: 15, 
              alignSelf: 'center', 
            }}
          />
          </TouchableOpacity>
        )}
        keyExtractor={(user) => user.Id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.7}
       
      />
    );
  };
  
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
           <View style={{ position:"absolute", 
                          height:"40%", 
                          backgroundColor: 'white', 
                          justifyContent: 'center', 
                          alignItems: 'center', 
                          bottom:0, 
                          borderTopLeftRadius:10, 
                          borderTopRightRadius:10}}>
            <TouchableOpacity onPress={handleClose} style={{  width: 0.9 * Dimensions.get('window').width, 
                                                              justifyContent:'center', 
                                                              alignItems:'center',
                                                              borderBottomWidth:1, 
                                                              borderBottomColor:'gray'}}>
            <Icon name="minus" size={40} style={{color:'black'}}/> 
            </TouchableOpacity>
            <RenderUsersLike
              item={selectedItem}
              url={url}
              url1={url1}
              contentType={contentType}
            />
           </View>
      </Modal>
    </View>
  );
};

export default DataRenderer;

