import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import ImageLoading from '../loadings/ImageLoading';
import styles from '../../styles/style';
import AttachmentsRender from './AttachmentsRender';
import Icon from 'react-native-vector-icons/FontAwesome';

const RenderItem = React.memo(({ item, loadingStates, }) => {
  const [countLike, setCountLike] = useState(0)
  const [colorLike, setColorLike] = useState('black')
  const handleLike = () => {
    setColorLike('red');
    setCountLike(countLike + 1);
  }
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
          <View style={{flexDirection:'row', marginTop:25,}}>
          <Text style={{ margin: 10, color:'black' }}>{item.ContactDate}</Text>
          {item.TotalSeen != null && (
              <Text style={{ margin: 10, right:0, color:'black' }}>{item.TotalSeen} Saw</Text>
            )}
          <TouchableOpacity onPress={handleLike}>
          <Text>{countLike} likes</Text>
          <Icon name='heart' size={24} style={{ margin: 5, right:0, color:colorLike }}/>  
          </TouchableOpacity>
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
        onEndReachedThreshold={1}
      />
    </View>
  );
};

export default DataRenderer;

