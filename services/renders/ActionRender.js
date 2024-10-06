import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import ImageLoading from '../loadings/ImageLoading';
import styles from '../../styles/style';
import AttachmentsRender from './AttachmentsRender';
import Icon from 'react-native-vector-icons/FontAwesome';
import { likeStatus } from '../../api/fetchAPI';

const RenderItem = React.memo(({ item, loadingStates, }) => {
  const [countLike, setCountLike] = useState(0)
  const [colorLike, setColorLike] = useState('')
  const handleLike = async() => {
    const response = await likeStatus(item.Id, "contact");
    console.log(response)
    if(response.code == 200){
    }
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
          <View>
          <TouchableOpacity style={{ margin: 5, right:0,flexDirection:'row',}}>
          <Text>{item.TotalLike}</Text>
          <Icon name='heart' size={15} style={{ margin: 5, right:0, color:"red" }}/>  
          </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',}}>
          <TouchableOpacity onPress={handleLike} style={{ margin: 5, right:0,}}>
          <Icon name='heart' size={24} style={{ margin: 5, right:0, color:colorLike }}/>  
          </TouchableOpacity>
          <Text style={{ margin: 10, color:'black', position:'absolute', right:0 }}>{item.ContactDate}</Text>
          </View>
        </View>
      )}
      
    </View>
  );
});

const DataRenderer = ({ data, loadingStates, refreshing, onRefresh, loadMore, }) => {

  return (
    <View style={{ backgroundColor:"#c7c8c9",}}>
      <FlatList
        data={data}
        renderItem={({ item }) => <RenderItem item={item} loadingStates={loadingStates} />} 
        keyExtractor={(item) => item.Id.toString()} 
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default DataRenderer;

