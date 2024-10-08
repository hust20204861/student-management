import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity,} from 'react-native';
import ImageLoading from '../loadings/ImageLoading';
import styles from '../../styles/style';
import AttachmentsRender from './AttachmentsRender';
import Icon from 'react-native-vector-icons/FontAwesome';
import { likeStatus } from '../../api/fetchAPI';

export default RenderItem = React.memo(({ item, loadingStates, handleGetUsersLike, contentType}) => {
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


